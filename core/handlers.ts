/**
 * @desc 数组切片
 * @desc startIndex 默认为0;endIndex默认为数组长度;startIndex不能>endIndex;默认包含起点元素,不包含终点元素
 * @desc 浅复制
 */

export function slice<T>(
  arr: Array<T>,
  startIndex = 0,
  endIndex?: number
): Array<T> | never {
  if (arr.length < 1) return [];
  if (!endIndex || endIndex > arr.length) {
    endIndex = arr.length;
  }
  if (startIndex > endIndex) throw new Error("起始点不能大于终止点");
  const slicedArr: Array<T> = [];
  for (let i = 0; i < endIndex; i++) {
    slicedArr.push(arr[i]);
  }
  return slicedArr;
}

/**@desc 数组查询 [{},{}] 这种 */
/**
 * @param multip 是否匹配多个,默认 false
 */
export function findBy<T>(
  arr: Array<T>,
  key: keyof T,
  value: any,
  multip = false
): Array<T> | T | undefined {
  const matched: Array<T> = [];
  for (const iter of arr) {
    if (iter[key] === value) {
      matched.push(iter);
    }
  }
  return multip ? matched : matched[0];
}

/**@desc 生成随机颜色 */
export function randomColor(): string {
  let color = "#";
  let values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  for (let i = 0; i < 6; i++) {
    const index = parseInt((Math.random() * 16).toString());
    color += values[index];
  }
  return color;
}

/**@desc 字符串替换,index不能小于0，并且不能大于等于value的长度,截取之后 */
/**
 * 比如: stringReplace("你好世界",0,"我") ---> "我好世界啊"
 */
export function stringReplace(
  value: string,
  index: number,
  inserted: string
): string {
  if (!value) return "";
  if (index < 0 && index >= value.length) {
    console.warn("index不能小于0,并且不能大于等于" + value + "的长度");
    return "";
  }
  let str = "";
  for (let i = 0; i <= value.length; i++) {
    if (i === index) {
      str += inserted;
      continue;
    }
    str += value.charAt(i);
  }
  return str;
}

/**
 * @desc 文件分片
 * @param {File} file 文件
 * @param {number} minSize 分片的尺寸
 */

export function sliceFile(file: File, minSize: number): Promise<Array<Blob>> {
  const byteSize = minSize * 1024 * 1024;
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = ({ target }) => {
      if (target) {
        const blob = new Blob([target.result as ArrayBuffer]);
        if (blob.size <= byteSize) {
          return resolve([blob]);
        }
        const times = Math.ceil(blob.size / byteSize);
        const blocks = [];
        for (let i = 0; i < times; i++) {
          const sliceBlob = blob.slice(i * byteSize, (i + 1) * byteSize);
          blocks.push(sliceBlob);
        }
        resolve(blocks);
      } else {
        reject(
          "fileReader.onload function's argument event.target is a invalid value"
        );
      }
    };
  });
}

export default {
  slice,
  findBy,
  randomColor,
  stringReplace,
  sliceFile,
};
