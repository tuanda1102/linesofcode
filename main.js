const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// GET DOM ELEMENT
const inputBtn = $(".input-file");
const returnFile = $(".file-return");
const labelInputBtn = $(".input-file-trigger");
const selectListfileBlock = $(".select__files-list");
const cplusList = $(".cplus__list");
const javascriptList = $(".javascript__list");
const javaList = $(".java__list");
const measurementsBlockCplus = $(".measurements__list-cplus");
const measurementsBlockJavascript = $(".measurements__list-javascript");
const measurementsBlockJava = $(".measurements__list-java");
const dropdownTypeLanguage = Array.from($$(".measurements_types-item-name"));
const notiNothing = `<div class="noti-nothing">Nothing</div>`;
const runBtn = $(".run");

const arrTypeLanguages = [
  {
    type: ".js",
    language: "Javascript",
  },
  {
    type: ".java",
    language: "Java",
  },
  {
    type: ".cpp",
    language: "C++",
  },
];
const allFiles = {
  cplusFiles: {
    name: "cplus__list-item",
    arr: [],
  },
  javascriptFiles: {
    name: "js__list-item",
    arr: [],
  },
  javaFiles: {
    name: "java__list-item",
    arr: [],
  },
};

let linesOfCodeJS = {
  arrLoc: [],
  linesPhysical: {
    id: 1,
    name: "Physical",
    lines: 0,
  },
  linesSource: {
    id: 2,
    name: "Source",
    lines: 0,
  },
  comment: {
    id: 6,
    name: "Comment",
    lines: 0,
  },
  singleLineComment: {
    id: 3,
    name: "Single-line comment",
    lines: 0,
  },
  blockComment: {
    id: 5,
    name: "Block comment",
    lines: 0,
  },
  mixed: {
    id: 7,
    name: "Mixed Lines",
    lines: 0,
  },
  emptyLines: {
    id: 4,
    name: "Empty Lines",
    lines: 0,
  },
};

let linesOfCodeCplus = {
  arrLoc: [],
  linesPhysical: {
    id: 1,
    name: "Physical",
    lines: 0,
  },
  linesSource: {
    id: 2,
    name: "Source",
    lines: 0,
  },
  comment: {
    id: 6,
    name: "Comment",
    lines: 0,
  },
  singleLineComment: {
    id: 3,
    name: "Single-line comment",
    lines: 0,
  },
  blockComment: {
    id: 5,
    name: "Block comment",
    lines: 0,
  },
  mixed: {
    id: 7,
    name: "Mixed Lines",
    lines: 0,
  },
  emptyLines: {
    id: 4,
    name: "Empty Lines",
    lines: 0,
  },
};

let linesOfCodeJava = {
  arrLoc: [],
  linesPhysical: {
    id: 1,
    name: "Physical",
    lines: 0,
  },
  linesSource: {
    id: 2,
    name: "Source",
    lines: 0,
  },
  comment: {
    id: 6,
    name: "Comment",
    lines: 0,
  },
  singleLineComment: {
    id: 3,
    name: "Single-line comment",
    lines: 0,
  },
  blockComment: {
    id: 5,
    name: "Block comment",
    lines: 0,
  },
  mixed: {
    id: 7,
    name: "Mixed Lines",
    lines: 0,
  },
  emptyLines: {
    id: 4,
    name: "Empty Lines",
    lines: 0,
  },
};

const app = {
  // Hàm render dữ liệu ra giao diện người dùng
  render: function () {
    // Render ra list các checkbox của từng loại ngôn ngữ
    let htmlsCplusList = this.renderFileListCheckbox(allFiles.cplusFiles);
    let htmlsJavascriptList = this.renderFileListCheckbox(
      allFiles.javascriptFiles
    );
    let htmlsJavaList = this.renderFileListCheckbox(allFiles.javaFiles);

    // Render ra Lines of code của từng loại
    let htmlsMeasurementsBlockCplus =
      this.renderListLineofcode(linesOfCodeCplus);
    let htmlMeasurementsBlockJavascript =
      this.renderListLineofcode(linesOfCodeJS);
    let htmlMeasurementsBlockJava = this.renderListLineofcode(linesOfCodeJava);

    cplusList.innerHTML = htmlsCplusList;
    javascriptList.innerHTML = htmlsJavascriptList;
    javaList.innerHTML = htmlsJavaList;

    // Kiểm tra xem trong Folder có loại code đó không
    // Nếu có thì in ra LOC
    cplusList.children.length !== 0
      ? (measurementsBlockCplus.innerHTML = htmlsMeasurementsBlockCplus)
      : (measurementsBlockCplus.innerHTML = notiNothing);
    javascriptList.children.length !== 0
      ? (measurementsBlockJavascript.innerHTML =
          htmlMeasurementsBlockJavascript)
      : (measurementsBlockJavascript.innerHTML = notiNothing);
    javaList.children.length !== 0
      ? (measurementsBlockJava.innerHTML = htmlMeasurementsBlockJava)
      : (measurementsBlockJava.innerHTML = notiNothing);

    this.handleSelectFiles();
  },

  // Hàm xử lý khi click vào các ô Checkbox
  handleSelectFiles: function () {
    const _this = this;
    const checkboxBtn = $$("#checkbox");

    // Lặp qua tất cả các ô checkbox, bắt sự kiện click vào từng ô
    Array.from(checkboxBtn).forEach((checkbox) => {
      checkbox.onclick = () => {
        let nameElement =
          checkbox.parentElement.querySelector(
            ".select__item-name"
          ).textContent;
        // Kiểm tra xem checkbox được click là thuộc loại ngôn ngữ lập trình nào
        _this.handleLocArr(checkbox, allFiles, nameElement, "js__list-item");
        _this.handleLocArr(checkbox, allFiles, nameElement, "cplus__list-item");
        _this.handleLocArr(checkbox, allFiles, nameElement, "java__list-item");
      };
    });
  },

  // Kiểm tra xem checkbox được click là thuộc loại ngôn ngữ lập trình nào
  // Rồi add file được check vào loại ngôn ngữ đó
  handleLocArr: function (checkbox, allFiles, nameElement, selector) {
    if (checkbox.dataset.item === selector) {
      let typeFile = {};
      if (selector === "js__list-item") {
        typeFile = allFiles.javascriptFiles;
      } else if (selector === "cplus__list-item") {
        typeFile = allFiles.cplusFiles;
      } else {
        typeFile = allFiles.javaFiles;
      }

      // Lặp qua tất cả các File, lấy ra file vừa được click
      typeFile.arr.forEach((file) => {
        if (nameElement === file.name) {
          // Kiểm tra xem file LOC đã có file đó chưa
          // Nếu có thì remove, nếu chưa thì add vào
          let isValid = linesOfCodeJS.arrLoc.find(
            (item) => item.name === file.name
          );
          if (isValid) {
            let index = linesOfCodeJS.arrLoc.indexOf(file);
            if (index > -1) {
              linesOfCodeJS.arrLoc.splice(index, 1);
            }
          } else {
            linesOfCodeJS.arrLoc.push(file);
          }
        }
      });
    }
  },

  // Hàm render ra các file cho từng loại ngôn ngữ
  renderFileListCheckbox: function (files) {
    return files.arr
      .map(
        (file) => `
            <label class="select__files-item">
                <span class="select__item-name">${file.name}</span>
                <input type="checkbox" id="checkbox" data-item="${files.name}"}>
                <span class="checkmark"></span>
            </label>
        `
      )
      .join("");
  },

  renderListLineofcode: function (dataLOC) {
    const { arrLoc, ...data } = dataLOC;
    return Object.values(data)
      .map(
        (values) => `
        <div class="measurement__item col-4">
            <div class="item__main">
                <div class="item__info">
                    <span class="item__number">${values.lines}</span>
                    <i class="fas fa-database"></i>
                </div>
                <div class="item__footer">
                    ${values.name}
                </div>
            </div>
        </div>
      `
      )
      .join("");
  },

  // Hàm xử lý tất cả các DOM Events
  handleEvents: function () {
    const _this = this;
    // let selectCheckbox = Array.from($$(".select__files-item"));

    // Hàm đọc dữ liệu
    inputBtn.onchange = (event) => {

      linesOfCodeJS = {
        arrLoc: [],
        linesPhysical: {
          id: 1,
          name: "Physical",
          lines: 0,
        },
        linesSource: {
          id: 2,
          name: "Source",
          lines: 0,
        },
        comment: {
          id: 6,
          name: "Comment",
          lines: 0,
        },
        singleLineComment: {
          id: 3,
          name: "Single-line comment",
          lines: 0,
        },
        blockComment: {
          id: 5,
          name: "Block comment",
          lines: 0,
        },
        mixed: {
          id: 7,
          name: "Mixed Lines",
          lines: 0,
        },
        emptyLines: {
          id: 4,
          name: "Empty Lines",
          lines: 0,
        },
      };
      linesOfCodeCplus = {
        arrLoc: [],
        linesPhysical: {
          id: 1,
          name: "Physical",
          lines: 0,
        },
        linesSource: {
          id: 2,
          name: "Source",
          lines: 0,
        },
        comment: {
          id: 6,
          name: "Comment",
          lines: 0,
        },
        singleLineComment: {
          id: 3,
          name: "Single-line comment",
          lines: 0,
        },
        blockComment: {
          id: 5,
          name: "Block comment",
          lines: 0,
        },
        mixed: {
          id: 7,
          name: "Mixed Lines",
          lines: 0,
        },
        emptyLines: {
          id: 4,
          name: "Empty Lines",
          lines: 0,
        },
      };
      linesOfCodeJava = {
        arrLoc: [],
        linesPhysical: {
          id: 1,
          name: "Physical",
          lines: 0,
        },
        linesSource: {
          id: 2,
          name: "Source",
          lines: 0,
        },
        comment: {
          id: 6,
          name: "Comment",
          lines: 0,
        },
        singleLineComment: {
          id: 3,
          name: "Single-line comment",
          lines: 0,
        },
        blockComment: {
          id: 5,
          name: "Block comment",
          lines: 0,
        },
        mixed: {
          id: 7,
          name: "Mixed Lines",
          lines: 0,
        },
        emptyLines: {
          id: 4,
          name: "Empty Lines",
          lines: 0,
        },
      };

      const files = event.target.files;

      // Lấy tên Folder đưa ra giao diện người dùng
      this.returnFolderName(files);

      // Lọc qua từng file
      // Lọc các File theo từng ngôn ngữ khác nhau
      Array.from(files).forEach((file) => {
        if (file.name.includes(".js")) {
          allFiles.javascriptFiles.arr.push(file);
        }
        if (file.name.includes(".cpp")) {
          allFiles.cplusFiles.arr.push(file);
        }
        if (file.name.includes(".java")) {
          allFiles.javaFiles.arr.push(file);
        }
      });

      runBtn.classList.add("active");

      _this.render();
    };

    // Click vào từng loại file mà code đọc được, sẽ show ra các dropbox bên trong
    dropdownTypeLanguage.forEach((language) => {
      language.onclick = () => {
        language.classList.toggle("show");
        language.firstElementChild.classList.toggle("fa-angle-down");
        language.firstElementChild.classList.toggle("fa-angle-right");
      };
    });

    runBtn.onclick = () => {
      this.handleData(linesOfCodeJS);
    };
  },

  // Hàm xử lý tất cả các tính toán về File
  handleData: async function (linesOfCode) {
    const { arrLoc } = linesOfCode;
    const contentFile = await Promise.all(
      arrLoc.map(async (file) => {
        return await this.readFileAsText(file);
      })
    );

    this.handleLinesOfCode(contentFile.join(""), linesOfCode);
  },

  // Hàm xử lý đếm số dòng code
  handleLinesOfCode: function (fileStrings, linesOfCode) {
    const fileCodeLength = fileStrings.length;
    const arrLines = fileStrings.split(/\r\n|\n/);
    let cmtLineAndMixed = 0;
    const arrLinesNotCmt = [];
    let linesInBlockCmt = 0;

    // Tính số dòng code Physical
    linesOfCode.linesPhysical.lines = arrLines.length;

    // Lặp qua tất cả các kí tự của File
    for (let index = 0; index < fileCodeLength; ++index) {
      // Đếm số dòng trong Block Comments
      if (fileStrings[index] === "/" && fileStrings[index + 1] === "*") {
        // Lấy ra dòng bắt đầu đếm code Block Comments
        let startCommentsBlock = index + 1;
        for (let i = startCommentsBlock; i < fileCodeLength; ++i) {
          if (fileStrings[i] === "\n") {
            linesInBlockCmt += 1;
          }
          // Kiểm tra xem lúc nào hàm đóng thì break ra khỏi vòng lặp
          if (fileStrings[i] === "*" && fileStrings[i + 1] === "/") {
            linesInBlockCmt += 1;
            break;
          }
        }
      }
    }

    // Lặp qua tất cả các dòng
    for (var line = 0; line < arrLines.length - 1; line++) {
      const [firstChar, ...restCharsLine] = arrLines[line].trim();
      let lineOutSpace = arrLines[line].trim();
      let comments = arrLines[line].includes("//");

      if (lineOutSpace[0] === "/" && lineOutSpace[1] === "/") {
        linesOfCode.singleLineComment.lines += 1;
      }

      // Đếm số dòng Single Comment và Mixed Comment
      if (comments) {
        cmtLineAndMixed += 1;
      } else {
        arrLinesNotCmt.push(arrLines[line].trim());
      }

      // Đếm dòng trống
      if (arrLines[line].trim() === "") {
        linesOfCode.emptyLines.lines += 1;
      }

      // Đếm số dòng Mixed
      if (restCharsLine.join("").includes("//")) {
        linesOfCode.mixed.lines += 1;
      }
    }

    // Lấy độ dài của mảng text không chứa dòng single line cmt
    const arrLinesNotCmtLength = arrLinesNotCmt.length;

    // Lặp qua từng dòng của File
    for (let indexLine = 0; indexLine < arrLinesNotCmtLength; ++indexLine) {
      // Lặp qua từng ký tự của từng dòng
      for (let char = 0; char < arrLinesNotCmt[indexLine].length; ++char) {
        if (
          arrLinesNotCmt[indexLine][char] === "/" &&
          arrLinesNotCmt[indexLine][char + 1] === "*"
        ) {
          let startCommentsBlock = indexLine;
          for (let i = startCommentsBlock; i < arrLinesNotCmtLength; ++i) {
            for (
              let charEndBlock = 0;
              charEndBlock < arrLinesNotCmt[i].length;
              ++charEndBlock
            ) {
              if (
                arrLinesNotCmt[i][charEndBlock] === "*" &&
                arrLinesNotCmt[i][charEndBlock + 1] === "/"
              ) {
                linesOfCode.blockComment.lines += 1;
                break;
              }
            }
          }
        }
      }
    }

    // Đếm tổng tất cả các dòng Comments Line
    linesOfCode.comment.lines =
      linesOfCode.mixed.lines +
      linesOfCode.singleLineComment.lines +
      linesInBlockCmt;

    // Đếm Source Lines
    linesOfCode.linesSource.lines =
      linesOfCode.linesPhysical.lines -
      linesOfCode.comment.lines -
      linesOfCode.emptyLines.lines;

    this.render();
  },

  // Hàm đọc File
  readFileAsText: function (file) {
    return new Promise(function (resolve, reject) {
      let fr = new FileReader();

      fr.onload = function () {
        resolve(fr.result);
      };

      fr.onerror = function () {
        reject(fr);
      };

      fr.readAsText(file);
    });
  },

  returnFolderName: function (files) {
    const relativePath = files[0].webkitRelativePath;
    const folderName = relativePath.split("/")[0];

    // Lấy tên Folder đưa ra giao diện người dùng
    returnFile.innerHTML = folderName;
  },

  // Hàm chạy chương trình
  start: function () {
    this.handleEvents();

    this.render();
  },
};

app.start();
