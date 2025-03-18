/**
 * 依赖注入的核心实现, 就是IoC容器
 * IoC 容器的基本功能包括：
 * 1. 注册服务：将服务的名称和实现注册到容器中
 * 2. 解析服务：从容器中获取服务的实例
 */
class IoCContainer {
  constructor() {
    this.services = new Map(); // 存储服务
    this.singletons = new Map(); // 存储单例
  }

  // 注册类（默认不是单例）
  register(name, ClassRef, dependencies = [], isSingleton = false) {
    this.services.set(name, { ClassRef, dependencies, isSingleton });
  }

  // 获取实例
  resolve(name) {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`Service ${name} not found in IoC Container`);
    }

    // 如果是单例，则直接返回已有实例
    if (service.isSingleton) {
      if (!this.singletons.has(name)) {
        console.log(service.dependencies, Array.isArray(service.dependencies));
        const dependencies = service.dependencies.map((dep) => this.resolve(dep));
        this.singletons.set(name, new service.ClassRef(...dependencies));
      }
      return this.singletons.get(name);
    }
    // 否则创建新实例
    const dependencies = service.dependencies.map((dep) => this.resolve(dep));
    return new service.ClassRef(...dependencies);
  }
}

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

// 创建 IoC 容器实例
const container = new IoCContainer();
container.register('serviceA', ServiceA, [], true);
container.register('serviceB', ServiceB, ['serviceA'], true);

console.log(container.resolve('serviceB').greet());
