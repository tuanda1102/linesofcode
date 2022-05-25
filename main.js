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

const linesOfCodeJS = {
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

const linesOfCodeCplus = {
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

const linesOfCodeJava = {
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
  },

  // Hàm render ra các file cho từng loại ngôn ngữ
  renderFileListCheckbox: function (files) {
    return files.arr
      .map(
        (file) => `
            <label class="select__files-item" data-set="${files.name}"}>
                <span class="select__item-name">${file.name}</span>
                <input type="checkbox" id="checkbox">
                <span class="checkmark"></span>
            </label>
        `
      )
      .join("");
  },

  renderListLineofcode: function (dataLOC) {
    return Object.values(dataLOC)
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
    const checkboxJsBtn = $$(".js__list-item");
    const checkboxCplusBtn = $$(".cplus__list-item");
    const checkboxJavaBtn = $$(".java__list-item");

    const _this = this;
    let selectCheckbox = Array.from($$(".select__files-item"));

    // Hàm đọc dữ liệu
    inputBtn.onchange = (event) => {
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

      _this.render();

      checkboxJsBtn.forEach((btn) => {
        btn.onclick = () => {
          console.log(btn);
        };
      });
    };

    // Click vào từng loại file mà code đọc được, sẽ show ra các dropbox bên trong
    dropdownTypeLanguage.forEach((language) => {
      language.onclick = () => {
        language.classList.toggle("show");
        language.firstElementChild.classList.toggle("fa-angle-down");
        language.firstElementChild.classList.toggle("fa-angle-right");
      };
    });

    // Xử lý sự kiện click checkbox
    selectCheckbox.forEach((checkbox) => {
      checkbox.addEventListener("click", function (e) {
        console.log(e);
      });
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
