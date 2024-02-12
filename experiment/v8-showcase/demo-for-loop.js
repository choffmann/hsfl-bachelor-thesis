function foo(a, b, c) {
  const d = c - 100;
  return a + b * d;
}

for (let i = 0; i <= 1e6; i++) {
  foo(5, i, 150)
}
