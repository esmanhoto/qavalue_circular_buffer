import CircularBuffer, {
  BufferFullError,
  BufferEmptyError,
} from "./circular-buffer";

describe("CircularBuffer", () => {
  test("reading empty buffer should fail", () => {
    const buffer = new CircularBuffer(1);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test("reading (bigger) empty buffer should fail", () => {
    const buffer = new CircularBuffer(3);
    expect(() => buffer.read()).toThrow(BufferEmptyError);
  });

  test("can read an item just written", () => {
    const buffer = new CircularBuffer(1);
    buffer.write("1");
    expect(buffer.read()).toBe("1");
  });

  test("reading 3 recently written items", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.write("3");
    expect(buffer.read()).toBe("3");
  });

  test("removing an item", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.write("3");
    buffer.clear();
    expect(buffer.read()).toBe("3");
  });

  test("removing two items", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.write("3");
    buffer.clear();
    buffer.clear();
    expect(buffer.read()).toBe("3");
  });

  test("force-writing an item", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.write("3");
    buffer.forceWrite("A");
    expect(buffer.read()).toBe("A");
  });

  test(" readMe example - force-writing, removing, and adding items", () => {
    const buffer = new CircularBuffer(7);
    buffer.write("3");
    buffer.write("4");
    buffer.write("5");
    buffer.write("6");
    buffer.write("7");
    buffer.write("8");
    buffer.write("9");
    buffer.forceWrite("A");
    buffer.forceWrite("B");
    buffer.clear();
    buffer.clear();
    buffer.write("C");
    buffer.write("D");
    buffer.forceWrite("E");
    expect(buffer.read()).toBe("E");
  });

  test("final test", () => {
    const buffer = new CircularBuffer(4);
    buffer.write("3");
    buffer.write("4");
    buffer.write("5");
    buffer.write("6");
    buffer.forceWrite("A");
    buffer.forceWrite("B");
    buffer.clear();
    buffer.write("C");
    buffer.forceWrite("D");
    expect(buffer.read()).toBe("D");
  });
});
