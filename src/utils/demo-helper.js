export const cloneObj = obj => JSON.parse(JSON.stringify(obj));

export const generateId = (prefix = 'id') =>
  `${prefix}_${Math.random().toString(36).substr(2, 16)}`;

export const validateEmpty = value => {
  if (value && !value.trim) {
    return true;
  }
  return !!value && value.trim().length;
};

export const safetyGet = (obj = {}, key = '', defaultVal = '') => obj[key] || defaultVal;

/**
 *
 * @param {*} obj  {a:1}
 * @param {*} key1 "label"
 * @param {*} key2 "value"
 * @returns {*} [{[key1]:a,[key2]:1}]
 */
export const parseObjectToAssignKey = (obj, key1, key2) => Object.keys(obj).map(key => {
    const val = obj[key];
    return {
      [key1]: key,
      [key2]: val,
    };
  });

export const sliceWord = (text, length = 12) =>
  text.length > length ? `${text.slice(0, length)}...` : text;

export const exportCsv = (title, data) => {
  const filename = `${title}.csv`;

  let csvContent = `data:text/csv;charset=utf-8,vectors\r\n`;

  data.forEach(row => {
    csvContent += `${JSON.stringify(row.value)  }\r\n`;
  });
  const encodedUri = encodeURI(csvContent);
  // download
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', filename);
  document.body.appendChild(link); // Required for FF

  link.click(); // This will download the data file named "my_data.csv".
  document.body.removeChild(link);
  return {
    encodedUri,
    filename,
  };
};

export function getImgUrl(file) {
  let url = null;
  if (window.createObjectURL) {
    // basic
    url = window.createObjectURL(file);
  } else if (window.URL) {
    // mozilla(firefox)
    url = window.URL.createObjectURL(file);
  } else if (window.webkitURL) {
    // webkit or chrome
    url = window.webkitURL.createObjectURL(file);
  }
  return url;
}

export function convertBase64UrlToBlob(base64) {
  const urlData = base64.dataURL;
  const {type} = base64;
  const bytes = window.atob(urlData.split(',')[1]); // 去掉url的头，并转换为byte

  const ab = new ArrayBuffer(bytes.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type });
}

export function getBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, img.width, img.height);
  const ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase();
  const dataURL = canvas.toDataURL(`image/${  ext}`);
  return {
    dataURL,
    type: `image/${  ext}`,
  };
}
