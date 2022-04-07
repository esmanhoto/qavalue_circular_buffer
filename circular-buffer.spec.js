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
});

test("reading 3 recently written items", () => {
  const buffer = new CircularBuffer(3);
  buffer.write("1");
  // console.log(buffer);
  buffer.write("2");
  // console.log(buffer);
  buffer.write("3");
  // console.log(buffer);
  expect(buffer.read()).toBe("3");
});
