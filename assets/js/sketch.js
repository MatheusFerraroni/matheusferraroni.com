const sketch = (p) => {
  const particles = [];
  const palette = ["#7dd3fc", "#38bdf8", "#f59e0b", "#f8fafc"];
  const particleCount = 300;
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
  const maxConnectionStrengh = 7;
  const maxForce = 1.00;
  let flowField = [];
  let flowFieldStrengths = [];
  let cols = 0;
  let rows = 0;
  let zOffset = 0;
  let shouldDrawFlowField = false;

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

    reset() {
      this.size = p.random(2, 10);
      this.depth = p.map(this.size, 2, 10, 0.35, 1, true);
      this.maxSpeed = p.map(this.size, 2, 10, minParticleSpeed, maxParticleSpeed, true);
      this.position = p.createVector(p.random(p.width), p.random(p.height));
      this.velocity = p.createVector(this.maxSpeed, 0);
      this.acceleration = p.createVector(0, 0);
      this.alpha = p.random(55, 130);
      this.color = p.color(p.random(palette));
      this.birthTime = p.millis();
      this.lifeDuration = p.random(particleLifetime * 0.5, particleLifetime);
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

    connectToPoint(targetX, targetY) {
      const distance = p.dist(
        this.position.x,
        this.position.y,
        targetX,
        targetY
      );

      if (distance < maxDistanceConnect){
        const connectionStrength = p.map(
          distance,
          0,
          maxDistanceConnect,
          maxConnectionStrengh,
          0,
          true
        );

        p.stroke(255, 255, 255, connectionStrength);
        p.line(
          this.position.x,
          this.position.y,
          targetX,
          targetY
        )
      }
    }

    connect(other){
      this.connectToPoint(other.position.x, other.position.y);
    }

    move() {
      if (this.getLifeProgress() >= 1) {
        this.reset();
        return;
      }

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);

      if (this.position.x < -this.size) {
        this.position.x = p.width + this.size;
      } else if (this.position.x > p.width + this.size) {
        this.position.x = -this.size;
      }

      if (this.position.y < -this.size) {
        this.position.y = p.height + this.size;
      } else if (this.position.y > p.height + this.size) {
        this.position.y = -this.size;
      }
    }

    draw() {
      p.noStroke();
      p.fill(p.red(this.color), p.green(this.color), p.blue(this.color), this.getCurrentAlpha());
      p.circle(this.position.x, this.position.y, this.size);
    }
  }

  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent("sketch-root");
    cols = p.ceil(p.width / fieldScale);
    rows = p.ceil(p.height / fieldScale);

    const flowFieldToggle = document.getElementById("toggle-flow-field");
    if (flowFieldToggle) {
      shouldDrawFlowField = flowFieldToggle.checked;
      flowFieldToggle.addEventListener("change", (event) => {
        shouldDrawFlowField = event.target.checked;
      });
    }

    for (let index = 0; index < particleCount; index += 1) {
      particles.push(new Particle());
    }
  };

  p.draw = () => {
    p.clear();
    updateFlowField();

    for (let index = 0; index < particles.length; index += 1) {
      particles[index].followFlowField();
      particles[index].move();
    }

    const orderedParticles = [...particles].sort((left, right) => left.size - right.size);

    for (let index = 0; index < particles.length-1; index += 1) {
      for (let jindex = 0; jindex < particles.length; jindex += 1) {
        particles[index].connect(particles[jindex])
      }

      particles[index].connectToPoint(p.mouseX, p.mouseY);
    }

    if (shouldDrawFlowField) {
      drawFlowField();
    }

    p.noFill();
    p.stroke(245, 158, 11, 22);
    p.circle(p.width * 0.78, p.height * 0.18, 260 + p.sin(p.frameCount * 0.01) * 18);
    p.stroke(125, 211, 252, 18);
    p.circle(p.width * 0.18, p.height * 0.68, 340 + p.cos(p.frameCount * 0.02) * 24);


    for (let index = 0; index < orderedParticles.length; index += 1) {
      orderedParticles[index].draw();
    }

  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
    cols = p.ceil(p.width / fieldScale);
    rows = p.ceil(p.height / fieldScale);
  };
};

new p5(sketch);
