import { BenchmarkReport } from "../../../utils";

const SOLAR_MASS = 4 * Math.PI * Math.PI;
const DAYS_PER_YEAR = 365.24;

class Body {
  public x: number
  public y: number
  public z: number
  public vx: number
  public vy: number
  public vz: number
  public mass: number

  constructor(x: number, y: number, z: number, vx: number, vy: number, vz: number, mass: number) {
    this.x = x
    this.y = y
    this.z = z
    this.vx = vx
    this.vy = vy
    this.vz = vz
    this.mass = mass
  }

  offsetMomentum(px: number, py: number, pz: number) {
    this.vx = -px / SOLAR_MASS
    this.vy = -py / SOLAR_MASS
    this.vz = -pz / SOLAR_MASS
  }
}

class Jupiter extends Body {
  constructor() {
    super(
      4.84143144246472090e+00,
      -1.16032004402742839e+00,
      -1.03622044471123109e-01,
      1.66007664274403694e-03 * DAYS_PER_YEAR,
      7.69901118419740425e-03 * DAYS_PER_YEAR,
      -6.90460016972063023e-05 * DAYS_PER_YEAR,
      9.54791938424326609e-04 * SOLAR_MASS
    )
  }
}

class Saturn extends Body {
  constructor() {
    super(
      8.34336671824457987e+00,
      4.12479856412430479e+00,
      -4.03523417114321381e-01,
      -2.76742510726862411e-03 * DAYS_PER_YEAR,
      4.99852801234917238e-03 * DAYS_PER_YEAR,
      2.30417297573763929e-05 * DAYS_PER_YEAR,
      2.85885980666130812e-04 * SOLAR_MASS
    )
  }
}

class Uranus extends Body {
  constructor() {
    super(
      1.28943695621391310e+01,
      -1.51111514016986312e+01,
      -2.23307578892655734e-01,
      2.96460137564761618e-03 * DAYS_PER_YEAR,
      2.37847173959480950e-03 * DAYS_PER_YEAR,
      -2.96589568540237556e-05 * DAYS_PER_YEAR,
      4.36624404335156298e-05 * SOLAR_MASS
    )
  }
}

class Neptune extends Body {
  constructor() {
    super(
      1.53796971148509165e+01,
      -2.59193146099879641e+01,
      1.79258772950371181e-01,
      2.68067772490389322e-03 * DAYS_PER_YEAR,
      1.62824170038242295e-03 * DAYS_PER_YEAR,
      -9.51592254519715870e-05 * DAYS_PER_YEAR,
      5.15138902046611451e-05 * SOLAR_MASS
    )
  }
}

class Sun extends Body {
  constructor() {
    super(0.0, 0.0, 0.0, 0.0, 0.0, 0.0, SOLAR_MASS)
  }
}

export class NBodySystem {
  public bodies: Body[]

  constructor(bodies: Body[]) {
    this.bodies = bodies
    this.init()
  }

  init() {
    let px = 0.0
    let py = 0.0
    let pz = 0.0
    for (let i = 0; i < this.bodies.length; i++) {
      const body = this.bodies[i]
      const mass = body.mass
      px += body.vx * mass
      py += body.vy * mass
      pz += body.vz * mass
    }
    this.bodies[0].offsetMomentum(px, py, pz)
  }

  advance(dt: number) {
    let dx: number, dy: number, dz: number, distance: number, mag: number
    const size = this.bodies.length

    for (let i = 0; i < size; i++) {
      const bodyi = this.bodies[i]
      for (let j = i + 1; j < size; j++) {
        const bodyj = this.bodies[j]
        dx = bodyi.x - bodyj.x
        dy = bodyi.y - bodyj.y
        dz = bodyi.z - bodyj.z

        distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        mag = dt / (distance * distance * distance)

        bodyi.vx -= dx * bodyj.mass * mag;
        bodyi.vy -= dy * bodyj.mass * mag;
        bodyi.vz -= dz * bodyj.mass * mag;

        bodyj.vx += dx * bodyi.mass * mag;
        bodyj.vy += dy * bodyi.mass * mag;
        bodyj.vz += dz * bodyi.mass * mag;
      }
    }

    for (var i = 0; i < size; i++) {
      var body = this.bodies[i];
      body.x += dt * body.vx;
      body.y += dt * body.vy;
      body.z += dt * body.vz;
    }
  }

  energy(): number {
    let dx: number, dy: number, dz: number, distance: number
    let e = 0.0
    const size = this.bodies.length

    for (let i = 0; i < size; i++) {
      const bodyi = this.bodies[i]

      e += 0.5 * bodyi.mass * (bodyi.vx * bodyi.vx + bodyi.vy * bodyi.vy + bodyi.vz * bodyi.vz)

      for (let j = i + 1; j < size; j++) {
        const bodyj = this.bodies[j]
        dx = bodyi.x - bodyj.x;
        dy = bodyi.y - bodyj.y;
        dz = bodyi.z - bodyj.z;

        distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        e -= (bodyi.mass * bodyj.mass) / distance;
      }
    }

    return e
  }
}

export function nbodyTs(n: number, reporter: (n: number, system: NBodySystem) => any): BenchmarkReport {
  let report: BenchmarkReport = {
    nthReport: [],
    totalTime: 0
  }
  console.log("[TS] Starting n-body simulation")
  const start = performance.now()

  for (let i = 0; i <= n; i++) {
    const startTime = performance.now()

    const bodies = new NBodySystem([new Sun(), new Jupiter(), new Saturn(), new Uranus(), new Neptune()])
    for (let j = 0; j <= i; i++) {
      bodies.advance(0.01)
    }
    const endTime = performance.now()
    reporter(i, bodies)
    report.nthReport.push({ n: i, time: Math.round(endTime - startTime) })
  }

  const end = performance.now()
  console.log("[TS] Finished n-body simulation")
  report.totalTime = end - start
  return report
}
