test('common matcher', () => {
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5);
});

test('to be true or false', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
});

test('number', () => {
    expect(3).toBeGreaterThan(2);
    expect(2).toBeLessThan(4);
    expect(2).toBeGreaterThanOrEqual(1);
});

test('object', () => {
    expect({ one: 1 }).toEqual({ one: 1 });
});
