// 示例：定义 ServiceA 和 ServiceB

// ServiceA：无依赖
class ServiceA {
  constructor() {
    this.name = 'Service A';
  }
  greet() {
    return `Hello from ${this.name}`;
  }
}

// ServiceB：依赖 ServiceA
class ServiceB {
  constructor(serviceA) {
    this.serviceA = serviceA;
  }
  greet() {
    return `${this.serviceA.greet()} and Service B greets you!`;
  }
}

class DependencyInjection {
  constructor() {
    this.services = {};
  }
  set(name, dependencies, implementation) {
    this.services[name] = {
      dependencies,
      implementation,
    };
  }
  get(name) {
    const service = this.services[name];
    if (!service) {
      throw new Error(`Service ${name} not found`);
    }
    const dependencies = service.dependencies.map((dependency) => this.get(dependency));
    return new service.implementation(...dependencies);
  }
}

const di = new DependencyInjection();

di.set('serviceA', [], ServiceA);
di.set('serviceB', ['serviceA'], ServiceB);

console.log(di.get('serviceB').greet());
