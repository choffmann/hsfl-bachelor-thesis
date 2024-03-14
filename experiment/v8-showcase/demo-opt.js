function foo(a, b, c) {
  const d = c - 100;
  return a + b * d;
}

%PrepareFunctionForOptimization(foo)
foo(5, 2, 150);
%OptimizeFunctionOnNextCall(foo)
foo(5, 2, 150);
