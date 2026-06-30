const sketch = (p) => {
  const particles = [];
  const palette = ["#7dd3fc", "#38bdf8", "#f59e0b", "#f8fafc"];
  const referenceWidth = 2560;
  const referenceHeight = 1440;
  const referenceParticles = 200;
  const defaultPixelRatio = 96;
  const minParticleCount = 60;
  const particleLifetime = 40000;
  const fadeDuration = 2000;
  const minParticleSpeed = 0.11;
  const maxParticleSpeed = 0.45;
  const fieldScale = 20;
  const noiseScale = 0.08;
  const zStep = 0.0010;
  const angleMultiplier = 3;
  const riverBiasStrength = 0.6;
  const dispersionStrength = 0.0300;
  const dispersionNoiseScale = 0.015;
  const maxDistanceConnect = 150;
  const maxConnectionStrengh = 12;
  const maxMouseConnectionStrength = 14;
  const maxMouseConnections = 5;
  const maxMouseCurveConnections = 6;
  const maxConnections = 5;
  const maxCurveConnections = 2;
  const neighborRadius = maxDistanceConnect;
  const neighborRadiusSquared = neighborRadius * neighborRadius;
  const neighborCellSize = neighborRadius;
  const neighborRecalcInterval = 1;
  const connectionFadeIn = 0.22;
  const connectionFadeOut = 0.10;
  const curveConnectionStrengthMultiplier = 1.35;
  const mouseCurveConnectionStrengthMultiplier = 1.0;
  const curveConnectionFadeOut = 0.06;
  const minVisibleConnectionStrength = 0.15;
  const mouseCurveBend = 0.22;
  const maxForce = 1.00;
  const fpsWindowMs = 2000;
  const fpsAdjustmentIntervalMs = 1000;
  const fallbackRefreshRate = 60;
  const minDetectedRefreshRate = 24;
  const maxDetectedRefreshRate = 144;
  const minFrameBudgetSamples = 20;
  const frameBudgetPressureThreshold = 0.85;
  const frameBudgetRecoveryThreshold = 0.55;
  const particleRecoveryStep = 12;
  const perfQuery = new URLSearchParams(window.location.search);
  const shouldProfileFrame = perfQuery.get("perf") === "1";
  const requestedProfileParticleCount = Number(perfQuery.get("particles"));
  const shouldLogParticleCounts = perfQuery.get("particleLogs") === "1";
  const profileSampleSize = 120;
  let maxParticleCount = referenceParticles;
  let initialParticleCount = Math.floor(maxParticleCount / 2);
  let profileParticleCount = initialParticleCount;
  let flowField = [];
  let flowFieldStrengths = [];
  let cols = 0;
  let rows = 0;
  let zOffset = 0;
  let shouldDrawFlowField = false;
  let targetParticleCount = initialParticleCount;
  let lastParticleAdjustmentAt = 0;
  const frameSamples = [];
  const frameCostSamples = [];
  const profileSamples = [];
  const profileAverages = {};
  const profileCounters = {
    directConnections: 0,
    curveConnections: 0,
    mouseConnections: 0,
    nearLinks: 0,
    nearComparisons: 0,
    neighborCells: 0,
    neighborRecalculated: false,
  };
  let spatialGrid = new Map();
  let nearbyParticlesByIndex = [];
  const directConnectionStates = new Map();
  const curveConnectionStates = new Map();
  const mouseDirectConnectionStates = new Map();
  const mouseCurveConnectionStates = new Map();
  let frameTimeTotal = 0;
  let frameCostTotal = 0;
  let detectedRefreshRate = fallbackRefreshRate;

  function now() {
    return performance.now();
  }

  function squaredDistanceBetweenPoints(startX, startY, endX, endY) {
    const dx = startX - endX;
    const dy = startY - endY;
    return dx * dx + dy * dy;
  }

  function measureFrameStep(frameProfile, label, callback) {
    const startedAt = now();
    const result = callback();
    frameProfile[label] = (frameProfile[label] || 0) + now() - startedAt;
    return result;
  }

  function shouldShowProfileOverlay() {
    return shouldProfileFrame || shouldDrawFlowField;
  }

  function getParticlePixelRatio() {
    const browserPixelRatio = Number(window.devicePixelRatio) || 1;
    return browserPixelRatio * defaultPixelRatio;
  }

  function getResponsiveCurrentArea() {
    const pixelRatioScale = getParticlePixelRatio() / defaultPixelRatio;
    return p.width * p.height * pixelRatioScale * pixelRatioScale;
  }

  function getResponsiveMaxParticleCount() {
    const referenceArea = referenceWidth * referenceHeight;
    const currentArea = getResponsiveCurrentArea();

    return Math.max(
      minParticleCount,
      Math.round((currentArea / referenceArea) * referenceParticles)
    );
  }

  function getFrameBudgetMs() {
    return 1000 / detectedRefreshRate;
  }

  function updateDetectedRefreshRate() {
    if (frameSamples.length < minFrameBudgetSamples) {
      return;
    }

    const sortedDurations = frameSamples
      .map((sample) => sample.frameDuration)
      .filter((frameDuration) => frameDuration > 0)
      .sort((left, right) => left - right);

    if (sortedDurations.length < minFrameBudgetSamples) {
      return;
    }

    const fastFrameIndex = Math.floor(sortedDurations.length * 0.1);
    const fastFrameDuration = sortedDurations[fastFrameIndex];
    const refreshRate = 1000 / fastFrameDuration;

    detectedRefreshRate = p.constrain(
      refreshRate,
      minDetectedRefreshRate,
      maxDetectedRefreshRate
    );
  }

  function logParticleCountState(label) {
    if (!shouldLogParticleCounts) {
      return;
    }

    const referenceArea = referenceWidth * referenceHeight;
    const cssArea = p.width * p.height;
    const particlePixelRatio = getParticlePixelRatio();
    const pixelRatioScale = particlePixelRatio / defaultPixelRatio;
    const currentArea = getResponsiveCurrentArea();
    const areaRatio = referenceArea > 0 ? currentArea / referenceArea : 0;

    console.log("[particles]", label, {
      canvasWidth: p.width,
      canvasHeight: p.height,
      windowWidth: p.windowWidth,
      windowHeight: p.windowHeight,
      devicePixelRatio: window.devicePixelRatio,
      defaultPixelRatio,
      particlePixelRatio,
      pixelRatioScale,
      referenceWidth,
      referenceHeight,
      referenceArea,
      cssArea,
      currentArea,
      areaRatio,
      referenceParticles,
      minParticleCount,
      maxParticleCount,
      initialParticleCount,
      profileParticleCount,
      targetParticleCount,
      activeParticleCount: getActiveParticleCount(),
      detectedRefreshRate,
      frameBudgetMs: getFrameBudgetMs(),
      averageFPS: getAverageFPS(),
      averageFrameCostMs: getAverageFrameCost(),
      shouldProfileFrame,
      requestedProfileParticleCount,
    });
  }

  function updateParticleCountLimits() {
    maxParticleCount = getResponsiveMaxParticleCount();
    initialParticleCount = Math.floor(maxParticleCount / 2);

    if (!shouldProfileFrame) {
      targetParticleCount = p.constrain(
        targetParticleCount,
        minParticleCount,
        maxParticleCount
      );
    }

    logParticleCountState("updateParticleCountLimits");
  }

  function updateProfileParticleCount() {
    const hasRequestedProfileCount =
      Number.isFinite(requestedProfileParticleCount) &&
      requestedProfileParticleCount > 0;

    profileParticleCount = p.constrain(
      hasRequestedProfileCount ? requestedProfileParticleCount : initialParticleCount,
      minParticleCount,
      maxParticleCount
    );

    logParticleCountState("updateProfileParticleCount");
  }

  function recordProfileSample(frameProfile) {
    if (!shouldShowProfileOverlay()) {
      return;
    }

    profileSamples.push(frameProfile);

    if (profileSamples.length > profileSampleSize) {
      profileSamples.shift();
    }

    const labels = Object.keys(frameProfile);

    for (let index = 0; index < labels.length; index += 1) {
      const label = labels[index];
      let total = 0;

      for (let sampleIndex = 0; sampleIndex < profileSamples.length; sampleIndex += 1) {
        total += profileSamples[sampleIndex][label] || 0;
      }

      profileAverages[label] = total / profileSamples.length;
    }

    const particlePerformance = {
      averages: { ...profileAverages },
      counters: { ...profileCounters },
      particles: particles.length,
      targetParticleCount,
      initialParticleCount,
      maxParticleCount,
      profileParticleCount,
      detectedRefreshRate,
      frameBudgetMs: getFrameBudgetMs(),
      averageFPS: getAverageFPS(),
      averageFrameCostMs: getAverageFrameCost(),
    };

    window.__particlePerformance = particlePerformance;
    document.documentElement.dataset.particlePerformance = JSON.stringify(particlePerformance);
  }

  function drawProfileOverlay() {
    if (!shouldShowProfileOverlay()) {
      return;
    }

    const rows = [
      ["total", profileAverages.totalFrame],
      ["flow", profileAverages.updateFlowField],
      ["move", profileAverages.moveParticles],
      ["cleanup", profileAverages.removeParticles],
      ["sort", profileAverages.sortParticles],
      ["near", profileAverages.calculateNearParticles],
      ["index", profileAverages.getParticleIndexes],
      ["direct", profileAverages.drawDirectConnections],
      ["curves", profileAverages.drawCurveConnections],
      ["mouse", profileAverages.drawMouseConnections],
      ["particles", profileAverages.drawParticles],
    ];
    const averageFPS = getAverageFPS();
    const currentFPS = p.deltaTime > 0 ? 1000 / p.deltaTime : 0;
    const frameBudgetMs = getFrameBudgetMs();
    const averageFrameCost = getAverageFrameCost();

    p.push();
    p.noStroke();
    p.fill(2, 6, 23, 220);
    p.rect(16, 16, 260, 482, 6);
    p.fill(226, 232, 240);
    p.textSize(12);
    p.textAlign(p.LEFT, p.TOP);
    p.text(`perf ${particles.length}/${targetParticleCount} particles`, 28, 28);
    p.text(`limits min ${minParticleCount} init ${initialParticleCount} max ${maxParticleCount}`, 28, 48);
    p.text(`fps avg ${averageFPS.toFixed(1)} now ${currentFPS.toFixed(1)}`, 28, 68);
    p.text(`refresh ${detectedRefreshRate.toFixed(1)}hz budget ${frameBudgetMs.toFixed(2)}ms`, 28, 88);
    p.text(`draw avg ${averageFrameCost.toFixed(2)}ms`, 28, 108);
    p.text(`near links ${profileCounters.nearLinks}`, 28, 128);
    p.text(`near checks ${profileCounters.nearComparisons}`, 28, 148);
    p.text(`grid cells ${profileCounters.neighborCells}`, 28, 168);
    p.text(`recalc ${profileCounters.neighborRecalculated ? "yes" : "no"}`, 28, 188);
    p.text(`direct ${profileCounters.directConnections}`, 28, 208);
    p.text(`curves ${profileCounters.curveConnections}`, 28, 228);
    p.text(`mouse ${profileCounters.mouseConnections}`, 28, 248);

    for (let index = 0; index < rows.length; index += 1) {
      const [label, value] = rows[index];
      const textValue = value === undefined ? "--" : `${value.toFixed(2)}ms`;
      p.text(`${label}: ${textValue}`, 28, 284 + index * 16);
    }

    p.pop();
  }

  function getActiveParticleCount() {
    let activeParticleCount = 0;

    for (let index = 0; index < particles.length; index += 1) {
      if (!particles[index].isRetiring) {
        activeParticleCount += 1;
      }
    }

    return activeParticleCount;
  }

  function syncParticlePopulation() {
    while (getActiveParticleCount() < targetParticleCount) {
      particles.push(new Particle());
    }

    let retiringParticlesNeeded = getActiveParticleCount() - targetParticleCount;

    if (retiringParticlesNeeded <= 0) {
      return;
    }

    for (let index = particles.length - 1; index >= 0; index -= 1) {
      const particle = particles[index];

      if (particle.isRetiring) {
        continue;
      }

      particle.retire();
      retiringParticlesNeeded -= 1;

      if (retiringParticlesNeeded <= 0) {
        break;
      }
    }
  }

  function recordFrameSample() {
    const now = p.millis();
    const frameDuration = p.deltaTime;

    frameSamples.push({ now, frameDuration });
    frameTimeTotal += frameDuration;

    while (frameSamples.length > 0 && now - frameSamples[0].now > fpsWindowMs) {
      frameTimeTotal -= frameSamples[0].frameDuration;
      frameSamples.shift();
    }

    updateDetectedRefreshRate();
  }

  function recordFrameCostSample(frameCost) {
    const now = p.millis();

    frameCostSamples.push({ now, frameCost });
    frameCostTotal += frameCost;

    while (frameCostSamples.length > 0 && now - frameCostSamples[0].now > fpsWindowMs) {
      frameCostTotal -= frameCostSamples[0].frameCost;
      frameCostSamples.shift();
    }
  }

  function getAverageFPS() {
    if (frameTimeTotal <= 0) {
      return detectedRefreshRate;
    }

    return frameSamples.length / (frameTimeTotal / 1000);
  }

  function getAverageFrameCost() {
    if (frameCostSamples.length === 0) {
      return 0;
    }

    return frameCostTotal / frameCostSamples.length;
  }

  function updateTargetParticleCount() {
    if (shouldProfileFrame) {
      targetParticleCount = profileParticleCount;
      syncParticlePopulation();
      logParticleCountState("updateTargetParticleCount:profile");
      return;
    }

    const now = p.millis();

    if (now - lastParticleAdjustmentAt < fpsAdjustmentIntervalMs) {
      return;
    }

    lastParticleAdjustmentAt = now;

    if (frameCostSamples.length < minFrameBudgetSamples) {
      return;
    }

    const averageFrameCost = getAverageFrameCost();
    const frameBudgetMs = getFrameBudgetMs();
    const pressureThresholdMs = frameBudgetMs * frameBudgetPressureThreshold;
    const recoveryThresholdMs = frameBudgetMs * frameBudgetRecoveryThreshold;

    if (averageFrameCost > pressureThresholdMs) {
      const scaledTarget = Math.floor(
        targetParticleCount * (pressureThresholdMs / averageFrameCost) * 0.96
      );
      targetParticleCount = p.constrain(scaledTarget, minParticleCount, maxParticleCount);
      syncParticlePopulation();
      logParticleCountState("updateTargetParticleCount:decrease");
      return;
    }

    if (averageFrameCost < recoveryThresholdMs && targetParticleCount < maxParticleCount) {
      targetParticleCount = p.constrain(
        targetParticleCount + particleRecoveryStep,
        minParticleCount,
        maxParticleCount
      );
      syncParticlePopulation();
      logParticleCountState("updateTargetParticleCount:recover");
    }
  }

  function updateFlowField() {
    flowField = new Array(cols * rows);
    flowFieldStrengths = new Array(cols * rows);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = col + row * cols;
        const noiseValue = p.noise(col * noiseScale, row * noiseScale, zOffset);
        const angle = noiseValue * p.TWO_PI * angleMultiplier;
        const flowVector = p5.Vector.fromAngle(angle);
        const riverDirection = p.createVector(1, 0);

        flowVector.lerp(riverDirection, riverBiasStrength);
        flowFieldStrengths[index] = flowVector.mag();
        flowVector.normalize();
        flowField[index] = flowVector;
      }
    }

    zOffset += zStep;
  }

  function drawFlowField() {
    const baseLength = fieldScale * 0.35;
    const variableLength = fieldScale * 0.45;

    p.push();
    p.strokeWeight(1);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const index = col + row * cols;
        const vector = flowField[index];
        const strength = flowFieldStrengths[index];

        if (!vector || strength === undefined) {
          continue;
        }

        const centerX = col * fieldScale + fieldScale * 0.5;
        const centerY = row * fieldScale + fieldScale * 0.5;
        const arrowLength = baseLength + variableLength * p.constrain(strength - 0.75, 0, 0.5);
        const direction = vector.copy().setMag(arrowLength);
        const headSize = 3;
        const alpha = p.map(strength, 0.75, 1.25, 35, 120, true);

        p.stroke(125, 211, 252, alpha);
        p.line(centerX, centerY, centerX + direction.x, centerY + direction.y);
        p.line(
          centerX + direction.x,
          centerY + direction.y,
          centerX + direction.x - headSize * p.cos(vector.heading() - p.PI / 6),
          centerY + direction.y - headSize * p.sin(vector.heading() - p.PI / 6)
        );
        p.line(
          centerX + direction.x,
          centerY + direction.y,
          centerX + direction.x - headSize * p.cos(vector.heading() + p.PI / 6),
          centerY + direction.y - headSize * p.sin(vector.heading() + p.PI / 6)
        );
      }
    }

    p.pop();
  }

  class Particle {
    constructor() {
      this.reset(true);
    }

    reset(isInitialReset = false) {
      this.size = p.random(3, 11);
      this.depth = p.map(this.size, 2, 10, 0.35, 1, true);
      this.maxSpeed = p.map(this.size, 2, 10, minParticleSpeed, maxParticleSpeed, true);
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(this.maxSpeed, 0);
      this.acceleration = p.createVector(0, 0);
      this.alpha = p.random(55, 130);
      this.color = p.color(p.random(palette));
      this.birthTime = p.millis();
      this.lifeDuration = p.random(particleLifetime * 0.5, particleLifetime);
      this.isRetiring = false;
      this.shouldRemove = false;
      this.connections = 0;
      this.nearParticles = [];
      this.skipConnectionsUntilNeighborRecalc = !isInitialReset;
      this.connectionInvalidatedAt = isInitialReset ? -1 : p.frameCount;
    }

    retire() {
      if (this.isRetiring) {
        return;
      }

      const now = p.millis();
      const age = now - this.birthTime;

      this.isRetiring = true;
      this.lifeDuration = Math.max(age + fadeDuration, fadeDuration);
    }

    getLifeProgress() {
      return (p.millis() - this.birthTime) / this.lifeDuration;
    }

    getCurrentAlpha() {
      const age = p.millis() - this.birthTime;
      const fadeInAlpha = p.map(age, 0, fadeDuration, 0, this.alpha, true);
      const fadeOutStart = this.lifeDuration - fadeDuration;

      if (age < fadeDuration) {
        return fadeInAlpha;
      }

      if (age > fadeOutStart) {
        return p.map(age, fadeOutStart, this.lifeDuration, this.alpha, 0, true);
      }

      return this.alpha;
    }

    followFlowField() {
      // Descobre em qual célula do flow field a partícula está
      const gridX = p.floor(this.position.x / fieldScale);
      const gridY = p.floor(this.position.y / fieldScale);

      // Faz wrap nas bordas para evitar índices fora do campo
      const wrappedX = ((gridX % cols) + cols) % cols;
      const wrappedY = ((gridY % rows) + rows) % rows;

      const index = wrappedX + wrappedY * cols;
      const force = flowField[index];

      // Se não houver vetor nessa posição, não aplica força
      if (!force) {
        return;
      }

      // Direção principal: a partícula continua seguindo o flow field
      const desired = force.copy();
      desired.setMag(this.maxSpeed);

      // Steering básico: ajusta a velocidade atual em direção ao vetor desejado
      const steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(maxForce);

      // Cria um vetor perpendicular ao fluxo.
      // Essa força lateral ajuda a quebrar o efeito de linha.
      const lateral = force.copy().rotate(p.HALF_PI);

      // Usa noise baseado na posição da partícula para variar a direção da dispersão
      const dispersionNoise = p.noise(
        this.position.x * dispersionNoiseScale,
        this.position.y * dispersionNoiseScale,
        zOffset + this.depth * 10
      );

      // Decide se a partícula dispersa para um lado ou para o outro
      const side = dispersionNoise > 0.5 ? 1 : -1;

      // Partículas menores recebem um pouco mais de dispersão
      const sizeFactor = p.map(this.size, 2, 10, 1.4, 0.6, true);

      // Força lateral final.
      // Aumente dispersionStrength para espalhar mais.
      // Diminua dispersionStrength para deixar o fluxo mais compacto.
      const dispersion = lateral.mult(side * dispersionStrength * sizeFactor);

      // Aplica a força principal do flow field e a dispersão lateral
      this.acceleration.add(steer);
      this.acceleration.add(dispersion);
    }

    connectToPoint(targetX, targetY, maxStrength = maxConnectionStrengh) {
      if (
        this.skipConnectionsUntilNeighborRecalc ||
        wasConnectionInvalidatedThisFrame(this)
      ) {
        return false;
      }

      const startX = this.position.x;
      const startY = this.position.y;
      const endX = targetX;
      const endY = targetY;
      const dx = endX - startX;
      const dy = endY - startY;
      const distance = p.sqrt(dx * dx + dy * dy);

      if (distance > 0 && distance < maxDistanceConnect){
        const connectionStrength = p.map(
          distance,
          0,
          maxDistanceConnect,
          maxStrength,
          0,
          true
        );

        p.stroke(255, 255, 255, connectionStrength);
        p.line(startX, startY, endX, endY);

        this.connections = this.connections+1;
        return true;
      }

      return false;
    }

    connect(other){
      return this.connectToPoint(other.position.x, other.position.y);
    }

    connectToNearbyParticle(nearbyParticle, connectionKey, activeConnectionKeys) {
      const targetParticle = nearbyParticle.particle;

      if (
        this.skipConnectionsUntilNeighborRecalc ||
        targetParticle.skipConnectionsUntilNeighborRecalc ||
        wasConnectionInvalidatedThisFrame(this) ||
        wasConnectionInvalidatedThisFrame(targetParticle) ||
        this.connections >= maxConnections ||
        targetParticle.connections >= maxConnections
      ) {
        return false;
      }

      const distance = Math.sqrt(nearbyParticle.distanceSquared);
      const connectionStrength = p.map(
        distance,
        0,
        maxDistanceConnect,
        maxConnectionStrengh,
        0,
        true
      );

      drawSmoothedDirectConnection(
        connectionKey,
        this,
        targetParticle,
        connectionStrength,
        activeConnectionKeys
      );

      this.connections = this.connections + 1;
      targetParticle.connections = targetParticle.connections + 1;
      return true;
    }

    connectToParticleThroughParticle(targetParticle, middleParticle, connectionKey, activeConnectionKeys) {
      const startX = this.position.x;
      const startY = this.position.y;
      const middleX = middleParticle.position.x;
      const middleY = middleParticle.position.y;
      const endX = targetParticle.position.x;
      const endY = targetParticle.position.y;
      const totalDistance =
        Math.sqrt(squaredDistanceBetweenPoints(startX, startY, middleX, middleY)) +
        Math.sqrt(squaredDistanceBetweenPoints(middleX, middleY, endX, endY));
      const connectionStrength = p.map(
        totalDistance,
        0,
        maxDistanceConnect * 2,
        maxConnectionStrengh * curveConnectionStrengthMultiplier,
        0,
        true
      );

      const curveT = 0.5;
      const curveAttraction = 0.5;
      const straightX = startX + (endX - startX) * curveT;
      const straightY = startY + (endY - startY) * curveT;
      const controlX = straightX + (middleX - straightX) * curveAttraction;
      const controlY = straightY + (middleY - straightY) * curveAttraction;

      drawSmoothedCurveConnection(
        connectionKey,
        this,
        middleParticle,
        targetParticle,
        {
          controlX,
          controlY,
          targetStrength: connectionStrength,
        },
        activeConnectionKeys
      );
    }

    move() {
      if (this.getLifeProgress() >= 1) {
        if (this.isRetiring) {
          this.shouldRemove = true;
          return;
        }

        this.reset();
        return;
      }

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      if (this.position.x < -this.size) {
        this.position.x = p.width + this.size;
        this.skipConnectionsUntilNeighborRecalc = true;
        this.connectionInvalidatedAt = p.frameCount;
      } else if (this.position.x > p.width + this.size) {
        this.position.x = -this.size;
        this.skipConnectionsUntilNeighborRecalc = true;
        this.connectionInvalidatedAt = p.frameCount;
      }

      if (this.position.y < -this.size) {
        this.position.y = p.height + this.size;
        this.skipConnectionsUntilNeighborRecalc = true;
        this.connectionInvalidatedAt = p.frameCount;
      } else if (this.position.y > p.height + this.size) {
        this.position.y = -this.size;
        this.skipConnectionsUntilNeighborRecalc = true;
        this.connectionInvalidatedAt = p.frameCount;
      }
    }

    draw() {
      p.noStroke();
      p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), this.getCurrentAlpha());
      p.circle(this.position.x, this.position.y, this.size);
    }
  }

  function getParticleX(particle) {
    return particle.position.x;
  }

  function getParticleY(particle) {
    return particle.position.y;
  }

  function getCellCoord(value) {
    return Math.floor(value / neighborCellSize);
  }

  function makeCellKey(cellX, cellY) {
    return `${cellX},${cellY}`;
  }

  function buildSpatialGrid() {
    const grid = new Map();

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const cellX = getCellCoord(getParticleX(particle));
      const cellY = getCellCoord(getParticleY(particle));
      const cellKey = makeCellKey(cellX, cellY);
      let cell = grid.get(cellKey);

      if (!cell) {
        cell = [];
        grid.set(cellKey, cell);
      }

      cell.push(index);
    }

    return grid;
  }

  function findNearbyParticlesForIndex(index, grid) {
    const particle = particles[index];
    const baseCellX = getCellCoord(getParticleX(particle));
    const baseCellY = getCellCoord(getParticleY(particle));
    const nearbyParticles = [];
    let comparisons = 0;

    for (let cellOffsetX = -1; cellOffsetX <= 1; cellOffsetX += 1) {
      for (let cellOffsetY = -1; cellOffsetY <= 1; cellOffsetY += 1) {
        const cellKey = makeCellKey(baseCellX + cellOffsetX, baseCellY + cellOffsetY);
        const cell = grid.get(cellKey);

        if (!cell) {
          continue;
        }

        for (let cellIndex = 0; cellIndex < cell.length; cellIndex += 1) {
          const otherIndex = cell[cellIndex];

          if (otherIndex === index) {
            continue;
          }

          const otherParticle = particles[otherIndex];
          const dx = getParticleX(particle) - getParticleX(otherParticle);
          const dy = getParticleY(particle) - getParticleY(otherParticle);
          const distanceSquared = dx * dx + dy * dy;

          comparisons += 1;

          if (distanceSquared <= neighborRadiusSquared) {
            nearbyParticles.push({
              index: otherIndex,
              particle: otherParticle,
              distanceSquared,
            });
          }
        }
      }
    }

    return {
      comparisons,
      nearbyParticles,
    };
  }

  function recalculateNearbyParticles() {
    let nearLinks = 0;
    let nearComparisons = 0;

    spatialGrid = buildSpatialGrid();
    nearbyParticlesByIndex = new Array(particles.length);

    for (let index = 0; index < particles.length; index += 1) {
      const result = findNearbyParticlesForIndex(index, spatialGrid);
      result.nearbyParticles.sort((left, right) => left.distanceSquared - right.distanceSquared);
      nearbyParticlesByIndex[index] = result.nearbyParticles;
      particles[index].nearParticles = result.nearbyParticles.map((item) => item.particle);
      particles[index].connections = 0;
      particles[index].skipConnectionsUntilNeighborRecalc = false;
      nearLinks += result.nearbyParticles.length;
      nearComparisons += result.comparisons;
    }

    profileCounters.nearLinks = nearLinks;
    profileCounters.nearComparisons = nearComparisons;
    profileCounters.neighborCells = spatialGrid.size;
    profileCounters.neighborRecalculated = true;
  }

  function updateNearbyParticlesIfNeeded() {
    profileCounters.neighborRecalculated = false;

    if (
      p.frameCount % neighborRecalcInterval === 0 ||
      nearbyParticlesByIndex.length !== particles.length
    ) {
      recalculateNearbyParticles();
    }
  }

  function getConnectionKey(leftIndex, rightIndex) {
    return leftIndex < rightIndex
      ? `${leftIndex}:${rightIndex}`
      : `${rightIndex}:${leftIndex}`;
  }

  function wasConnectionInvalidatedThisFrame(particle) {
    return particle.connectionInvalidatedAt === p.frameCount;
  }

  function shouldDropSmoothedConnection(state) {
    return (
      state.left.skipConnectionsUntilNeighborRecalc ||
      state.right.skipConnectionsUntilNeighborRecalc ||
      (state.middle && state.middle.skipConnectionsUntilNeighborRecalc) ||
      wasConnectionInvalidatedThisFrame(state.left) ||
      wasConnectionInvalidatedThisFrame(state.right) ||
      (state.middle && wasConnectionInvalidatedThisFrame(state.middle))
    );
  }

  function drawDirectConnectionLine(leftParticle, rightParticle, strength) {
    p.stroke(255, 255, 255, strength);
    p.line(
      leftParticle.position.x,
      leftParticle.position.y,
      rightParticle.position.x,
      rightParticle.position.y
    );
  }

  function drawCurveConnectionLine(leftParticle, middleParticle, rightParticle, controlX, controlY, strength) {
    p.noFill();
    p.stroke(255, 255, 255, strength);
    p.beginShape();
    p.vertex(leftParticle.position.x, leftParticle.position.y);
    p.quadraticVertex(controlX, controlY, rightParticle.position.x, rightParticle.position.y);
    p.endShape();
  }

  function drawMouseCurveConnectionLine(state) {
    p.noFill();
    p.stroke(255, 255, 255, state.strength);
    p.beginShape();
    p.vertex(state.startX, state.startY);
    p.quadraticVertex(state.controlX, state.controlY, state.endX, state.endY);
    p.endShape();
  }

  function drawMouseDirectConnectionLine(state) {
    p.stroke(255, 255, 255, state.strength);
    p.line(
      state.startX,
      state.startY,
      state.target.position.x,
      state.target.position.y
    );
  }

  function drawSmoothedMouseDirectConnection(key, targetParticle, targetStrength, activeConnectionKeys) {
    activeConnectionKeys.add(key);

    const state = mouseDirectConnectionStates.get(key) || {
      target: targetParticle,
      startX: p.mouseX,
      startY: p.mouseY,
      strength: 0,
    };

    state.target = targetParticle;
    state.startX = p.mouseX;
    state.startY = p.mouseY;
    state.strength = p.lerp(state.strength, targetStrength, connectionFadeIn);
    mouseDirectConnectionStates.set(key, state);

    if (state.strength > minVisibleConnectionStrength) {
      drawMouseDirectConnectionLine(state);
    }
  }

  function fadeInactiveMouseDirectConnections(activeConnectionKeys) {
    for (const [key, state] of mouseDirectConnectionStates) {
      if (activeConnectionKeys.has(key)) {
        continue;
      }

      if (
        state.target.skipConnectionsUntilNeighborRecalc ||
        wasConnectionInvalidatedThisFrame(state.target)
      ) {
        mouseDirectConnectionStates.delete(key);
        continue;
      }

      state.strength = p.lerp(state.strength, 0, connectionFadeOut);

      if (state.strength <= minVisibleConnectionStrength) {
        mouseDirectConnectionStates.delete(key);
        continue;
      }

      drawMouseDirectConnectionLine(state);
    }
  }

  function drawMouseCurveConnection(targetParticle, middleParticle, connectionKey, activeConnectionKeys) {
    if (
      targetParticle.skipConnectionsUntilNeighborRecalc ||
      middleParticle.skipConnectionsUntilNeighborRecalc ||
      wasConnectionInvalidatedThisFrame(targetParticle) ||
      wasConnectionInvalidatedThisFrame(middleParticle)
    ) {
      return false;
    }

    const startX = p.mouseX;
    const startY = p.mouseY;
    const middleX = middleParticle.position.x;
    const middleY = middleParticle.position.y;
    const endX = targetParticle.position.x;
    const endY = targetParticle.position.y;
    const totalDistance =
      Math.sqrt(squaredDistanceBetweenPoints(startX, startY, middleX, middleY)) +
      Math.sqrt(squaredDistanceBetweenPoints(middleX, middleY, endX, endY));

    if (totalDistance <= 0 || totalDistance > maxDistanceConnect * 2) {
      return false;
    }

    const connectionStrength = p.map(
      totalDistance,
      0,
      maxDistanceConnect * 2,
      maxMouseConnectionStrength * mouseCurveConnectionStrengthMultiplier,
      0,
      true
    );
    const straightX = startX + (endX - startX) * 0.5;
    const straightY = startY + (endY - startY) * 0.5;
    const controlX = straightX + (middleX - straightX) * mouseCurveBend;
    const controlY = straightY + (middleY - straightY) * mouseCurveBend;

    drawSmoothedMouseCurveConnection(
      connectionKey,
      middleParticle,
      targetParticle,
      {
        startX,
        startY,
        endX,
        endY,
        controlX,
        controlY,
        targetStrength: connectionStrength,
      },
      activeConnectionKeys
    );

    return true;
  }

  function shouldDropMouseCurveConnection(state) {
    return (
      state.middle.skipConnectionsUntilNeighborRecalc ||
      state.target.skipConnectionsUntilNeighborRecalc ||
      wasConnectionInvalidatedThisFrame(state.middle) ||
      wasConnectionInvalidatedThisFrame(state.target)
    );
  }

  function drawSmoothedDirectConnection(key, leftParticle, rightParticle, targetStrength, activeConnectionKeys) {
    activeConnectionKeys.add(key);

    const state = directConnectionStates.get(key) || {
      left: leftParticle,
      right: rightParticle,
      strength: 0,
    };

    state.left = leftParticle;
    state.right = rightParticle;
    state.strength = p.lerp(state.strength, targetStrength, connectionFadeIn);
    directConnectionStates.set(key, state);

    if (state.strength > minVisibleConnectionStrength) {
      drawDirectConnectionLine(leftParticle, rightParticle, state.strength);
    }
  }

  function fadeInactiveDirectConnections(activeConnectionKeys) {
    for (const [key, state] of directConnectionStates) {
      if (activeConnectionKeys.has(key)) {
        continue;
      }

      if (shouldDropSmoothedConnection(state)) {
        directConnectionStates.delete(key);
        continue;
      }

      state.strength = p.lerp(state.strength, 0, connectionFadeOut);

      if (state.strength <= minVisibleConnectionStrength) {
        directConnectionStates.delete(key);
        continue;
      }

      drawDirectConnectionLine(state.left, state.right, state.strength);
    }
  }

  function drawSmoothedCurveConnection(key, leftParticle, middleParticle, rightParticle, curveData, activeConnectionKeys) {
    activeConnectionKeys.add(key);

    const state = curveConnectionStates.get(key) || {
      left: leftParticle,
      middle: middleParticle,
      right: rightParticle,
      controlX: curveData.controlX,
      controlY: curveData.controlY,
      strength: 0,
    };

    state.left = leftParticle;
    state.middle = middleParticle;
    state.right = rightParticle;
    state.controlX = curveData.controlX;
    state.controlY = curveData.controlY;
    state.strength = p.lerp(state.strength, curveData.targetStrength, connectionFadeIn);
    curveConnectionStates.set(key, state);

    if (state.strength > minVisibleConnectionStrength) {
      drawCurveConnectionLine(leftParticle, middleParticle, rightParticle, state.controlX, state.controlY, state.strength);
    }
  }

  function fadeInactiveCurveConnections(activeConnectionKeys) {
    for (const [key, state] of curveConnectionStates) {
      if (activeConnectionKeys.has(key)) {
        continue;
      }

      if (shouldDropSmoothedConnection(state)) {
        curveConnectionStates.delete(key);
        continue;
      }

      state.strength = p.lerp(state.strength, 0, curveConnectionFadeOut);

      if (state.strength <= minVisibleConnectionStrength) {
        curveConnectionStates.delete(key);
        continue;
      }

      drawCurveConnectionLine(
        state.left,
        state.middle,
        state.right,
        state.controlX,
        state.controlY,
        state.strength
      );
    }
  }

  function drawSmoothedMouseCurveConnection(key, middleParticle, targetParticle, curveData, activeConnectionKeys) {
    activeConnectionKeys.add(key);

    const state = mouseCurveConnectionStates.get(key) || {
      middle: middleParticle,
      target: targetParticle,
      startX: curveData.startX,
      startY: curveData.startY,
      endX: curveData.endX,
      endY: curveData.endY,
      controlX: curveData.controlX,
      controlY: curveData.controlY,
      strength: 0,
    };

    state.middle = middleParticle;
    state.target = targetParticle;
    state.startX = curveData.startX;
    state.startY = curveData.startY;
    state.endX = curveData.endX;
    state.endY = curveData.endY;
    state.controlX = curveData.controlX;
    state.controlY = curveData.controlY;
    state.strength = p.lerp(state.strength, curveData.targetStrength, connectionFadeIn);
    mouseCurveConnectionStates.set(key, state);

    if (state.strength > minVisibleConnectionStrength) {
      drawMouseCurveConnectionLine(state);
    }
  }

  function fadeInactiveMouseCurveConnections(activeConnectionKeys) {
    for (const [key, state] of mouseCurveConnectionStates) {
      if (activeConnectionKeys.has(key)) {
        continue;
      }

      if (shouldDropMouseCurveConnection(state)) {
        mouseCurveConnectionStates.delete(key);
        continue;
      }

      state.strength = p.lerp(state.strength, 0, curveConnectionFadeOut);

      if (state.strength <= minVisibleConnectionStrength) {
        mouseCurveConnectionStates.delete(key);
        continue;
      }

      drawMouseCurveConnectionLine(state);
    }
  }

  function getParticleIndexes() {
    const particleIndexes = new Map();

    for (let index = 0; index < particles.length; index += 1) {
      particleIndexes.set(particles[index], index);
    }

    return particleIndexes;
  }

  function calculateNearParticles() {
    for (let index = 0; index < particles.length; index += 1) {
      particles[index].connections = 0;
    }

    updateNearbyParticlesIfNeeded();
  }

  function drawDirectParticleConnections() {
    const drawnConnections = new Set();
    let connectionCount = 0;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      const nearbyParticles = nearbyParticlesByIndex[index] || [];

      for (let neighborIndex = 0; neighborIndex < nearbyParticles.length; neighborIndex += 1) {
        if (
          particle.skipConnectionsUntilNeighborRecalc ||
          wasConnectionInvalidatedThisFrame(particle) ||
          particle.connections >= maxConnections
        ) {
          break;
        }

        const nearbyParticle = nearbyParticles[neighborIndex];
        const connectionKey = getConnectionKey(index, nearbyParticle.index);

        if (drawnConnections.has(connectionKey)) {
          continue;
        }

        if (particle.connectToNearbyParticle(nearbyParticle, connectionKey, drawnConnections)) {
          drawnConnections.add(connectionKey);
          connectionCount += 1;
        }
      }
    }

    fadeInactiveDirectConnections(drawnConnections);
    profileCounters.directConnections = connectionCount;
    return drawnConnections;
  }

  function drawIndirectParticleConnections(particleIndexes, directConnectionKeys) {
    const drawnCurves = new Set();
    let curveConnectionCount = 0;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];
      let curveConnections = 0;

      if (
        particle.skipConnectionsUntilNeighborRecalc ||
        wasConnectionInvalidatedThisFrame(particle)
      ) {
        continue;
      }

      for (let middleIndex = 0; middleIndex < particle.nearParticles.length; middleIndex += 1) {
        if (curveConnections >= maxCurveConnections) {
          break;
        }

        const middleParticle = particle.nearParticles[middleIndex];

        if (
          middleParticle.skipConnectionsUntilNeighborRecalc ||
          wasConnectionInvalidatedThisFrame(middleParticle)
        ) {
          continue;
        }

        for (let targetIndex = 0; targetIndex < middleParticle.nearParticles.length; targetIndex += 1) {
          const targetParticle = middleParticle.nearParticles[targetIndex];

          if (
            targetParticle === particle ||
            targetParticle.skipConnectionsUntilNeighborRecalc ||
            wasConnectionInvalidatedThisFrame(targetParticle)
          ) {
            continue;
          }

          const targetParticleIndex = particleIndexes.get(targetParticle);

          if (targetParticleIndex === undefined) {
            continue;
          }

          const connectionKey = getConnectionKey(index, targetParticleIndex);

          if (directConnectionKeys.has(connectionKey) || drawnCurves.has(connectionKey)) {
            continue;
          }

          drawnCurves.add(connectionKey);
          particle.connectToParticleThroughParticle(
            targetParticle,
            middleParticle,
            connectionKey,
            drawnCurves
          );
          curveConnections += 1;
          curveConnectionCount += 1;
          break;
        }
      }
    }

    fadeInactiveCurveConnections(drawnCurves);
    profileCounters.curveConnections = curveConnectionCount;
  }

  function drawMouseConnections() {
    const activeMouseDirectKeys = new Set();
    const mouseNearbyParticleIndexes = new Set();
    const activeMouseCurveKeys = new Set();
    const mouseNearbyCandidates = [];
    let mouseConnections = 0;
    let mouseCurveConnections = 0;

    for (let index = 0; index < particles.length; index += 1) {
      const particle = particles[index];

      if (
        particle.skipConnectionsUntilNeighborRecalc ||
        wasConnectionInvalidatedThisFrame(particle)
      ) {
        continue;
      }

      const distanceSquared = squaredDistanceBetweenPoints(
        p.mouseX,
        p.mouseY,
        particle.position.x,
        particle.position.y
      );

      if (distanceSquared > 0 && distanceSquared <= neighborRadiusSquared) {
        mouseNearbyCandidates.push({
          index,
          particle,
          distanceSquared,
        });
      }
    }

    mouseNearbyCandidates.sort((left, right) => left.distanceSquared - right.distanceSquared);

    for (
      let index = 0;
      index < mouseNearbyCandidates.length && mouseConnections < maxMouseConnections;
      index += 1
    ) {
      const candidate = mouseNearbyCandidates[index];
      const distance = Math.sqrt(candidate.distanceSquared);
      const connectionStrength = p.map(
        distance,
        0,
        maxDistanceConnect,
        maxMouseConnectionStrength,
        0,
        true
      );
      const connectionKey = `mouse-direct:${candidate.index}`;

      drawSmoothedMouseDirectConnection(
        connectionKey,
        candidate.particle,
        connectionStrength,
        activeMouseDirectKeys
      );
      mouseNearbyParticleIndexes.add(candidate.index);
      mouseConnections += 1;
    }

    for (const middleParticleIndex of mouseNearbyParticleIndexes) {
      if (mouseCurveConnections >= maxMouseCurveConnections) {
        break;
      }

      const middleParticle = particles[middleParticleIndex];
      const nearbyParticles = nearbyParticlesByIndex[middleParticleIndex] || [];
      let curveConnections = 0;

      for (let index = 0; index < nearbyParticles.length; index += 1) {
        if (
          curveConnections >= maxCurveConnections ||
          mouseCurveConnections >= maxMouseCurveConnections
        ) {
          break;
        }

        const targetNearbyParticle = nearbyParticles[index];
        const connectionKey = `mouse:${middleParticleIndex}:${targetNearbyParticle.index}`;

        if (mouseNearbyParticleIndexes.has(targetNearbyParticle.index)) {
          continue;
        }

        if (
          drawMouseCurveConnection(
            targetNearbyParticle.particle,
            middleParticle,
            connectionKey,
            activeMouseCurveKeys
          )
        ) {
          curveConnections += 1;
          mouseCurveConnections += 1;
        }
      }
    }

    fadeInactiveMouseDirectConnections(activeMouseDirectKeys);
    fadeInactiveMouseCurveConnections(activeMouseCurveKeys);
    profileCounters.mouseConnections = mouseConnections;
  }

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("sketch-root");
    cols = p.ceil(p.width / fieldScale);
    rows = p.ceil(p.height / fieldScale);
    updateParticleCountLimits();
    updateProfileParticleCount();
    targetParticleCount = shouldProfileFrame ? profileParticleCount : initialParticleCount;

    const flowFieldToggle = document.getElementById("toggle-flow-field");
    if (flowFieldToggle) {
      shouldDrawFlowField = flowFieldToggle.checked;
      flowFieldToggle.addEventListener("change", (event) => {
        shouldDrawFlowField = event.target.checked;
      });
    }

    syncParticlePopulation();
    logParticleCountState("setup:afterSync");
  };

  p.draw = () => {
    const frameStartedAt = now();
    const frameProfile = {};

    measureFrameStep(frameProfile, "frameAdmin", () => {
      recordFrameSample();
      updateTargetParticleCount();
    });

    measureFrameStep(frameProfile, "clear", () => {
      p.clear();
    });

    measureFrameStep(frameProfile, "updateFlowField", () => {
      updateFlowField();
    });

    measureFrameStep(frameProfile, "moveParticles", () => {
      for (let index = 0; index < particles.length; index += 1) {
        particles[index].followFlowField();
        particles[index].move();
      }
    });

    measureFrameStep(frameProfile, "removeParticles", () => {
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        if (particles[index].shouldRemove) {
          particles.splice(index, 1);
        }
      }
    });

    const orderedParticles = measureFrameStep(frameProfile, "sortParticles", () => {
      return [...particles].sort((left, right) => left.size - right.size);
    });

    measureFrameStep(frameProfile, "calculateNearParticles", () => {
      calculateNearParticles();
    });

    const particleIndexes = measureFrameStep(frameProfile, "getParticleIndexes", () => {
      return getParticleIndexes();
    });

    const directConnectionKeys = measureFrameStep(frameProfile, "drawDirectConnections", () => {
      return drawDirectParticleConnections();
    });

    measureFrameStep(frameProfile, "drawCurveConnections", () => {
      drawIndirectParticleConnections(particleIndexes, directConnectionKeys);
    });

    measureFrameStep(frameProfile, "drawMouseConnections", () => {
      drawMouseConnections();
    });

    if (shouldDrawFlowField) {
      measureFrameStep(frameProfile, "drawFlowField", () => {
        drawFlowField();
      });
    }

    measureFrameStep(frameProfile, "drawRings", () => {
      p.noFill();
      p.stroke(245, 158, 11, 22);
      p.circle(p.width * 0.78, p.height * 0.18, 260 + p.sin(p.frameCount * 0.01) * 18);
      p.stroke(125, 211, 252, 18);
      p.circle(p.width * 0.18, p.height * 0.68, 340 + p.cos(p.frameCount * 0.02) * 24);
    });

    measureFrameStep(frameProfile, "drawParticles", () => {
      for (let index = 0; index < orderedParticles.length; index += 1) {
        orderedParticles[index].draw();
      }
    });

    frameProfile.totalFrame = now() - frameStartedAt;
    recordFrameCostSample(frameProfile.totalFrame);
    recordProfileSample(frameProfile);
    drawProfileOverlay();

  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cols = p.ceil(p.width / fieldScale);
    rows = p.ceil(p.height / fieldScale);
    updateParticleCountLimits();
    updateProfileParticleCount();
    targetParticleCount = shouldProfileFrame ? profileParticleCount : initialParticleCount;
    syncParticlePopulation();
    logParticleCountState("windowResized:afterSync");
  };
};

new p5(sketch);
