const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const fileInput = $(".input-file");
const returnFile = $(".file-return");
const measurementBlock = $(".measurements__list");
const allFiles = [];
const inputLanguage = $('.languages');
let fileCode = "";

const linesOfCode = {
  linesPhysical: {
    id: 1,
    name: "Physical",
    lines: 0,
  },
  linesLogical: {
    id: 2,
    name: "Logical",
    lines: 0,
  },
  comment: {
    id: 6,
    name: "Comment",
    lines: 0,
  },
  commentsLine: {
    id: 3,
    name: "Single-line comment",
    lines: 0,
  },
  blockComment: {
    id: 5,
    name: "Lines of Block Comment",
    lines: 0,
  },
  mixed: {
    id: 7,
    name: "Mixed",
    lines: 0,
  },
  emptyLines: {
    id: 4,
    name: "Empty Lines",
    lines: 0,
  },
};

// Get keys of Object LinesOfCode
const {
  linesPhysical,
  linesLogical,
  commentsLine,
  emptyLines,
  blockComment,
  comment,
  mixed
} = linesOfCode;

// REGEX
const ops = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "<",
  ">",
  "<=",
  ">=",
  "&",
  "|",
  "^",
  "(",
  ")",
];

const app = {
  // Render các thông số ra giao diện người dùng
  render: function () {
    const valuesOj = Object.values(linesOfCode);
    const loc = [...valuesOj];
    let htmls = loc.map((item) => {
      return `
      <div class="measurement__item col-3">
        <div class="item__main">
            <div class="item__info">
                <span class="item__number">${item.lines}</span>
                <i class="fas fa-database"></i>
            </div>
            <div class="item__footer">
              ${item.name}
            </div>
        </div>
      </div>
      `;
    });
    measurementBlock.innerHTML = htmls.join("");
  },
  // Hàm xử lý sự kiện
  handleEvents: function () {
    const _this = this;
    let inputLanguageValue = undefined;

    // Xử lý khi chọn ngôn ngữ
    inputLanguage.addEventListener('change', function () {
      inputLanguageValue = inputLanguage.value;
    })

    fileInput.addEventListener('click', function(e) {

      switch (inputLanguageValue) {
        case 'java':
          break;
      
        case 'javascript' :
          break;

        case 'c++':
          break;
      
        default:
          break;
      }

      if(inputLanguageValue !== undefined) {
        fileInput.addEventListener('change', function(event) {
          let files = event.target.files;
    
          Array.from(files).forEach((file) => {
            if(file.name.includes('.js')) {
              allFiles.push(file);
            }
          })
        })

        // Returns the selected file
        fileInput.addEventListener("change", function (event) {
          let fr = new FileReader();
          fr.onload = function () {
            fileCode = fr.result;
            _this.handleFiles(fileCode);
            _this.render();
          };

          fr.readAsText(event.target.files[0]);
          returnFile.innerHTML = this.value;
        });
      } else {
        alert('Chua chon ngon ngu');
        e.preventDefault();
      }

      console.log(inputLanguageValue);

    })

    

    console.log(allFiles);


    
  },
  // Hàm xử lý logic Lines of Code
  handleFiles: function (fileCode) {
    const fileCodeLength = fileCode.length;
    const arrLines = fileCode.split(/\r\n|\n/); // Mixed 1

    let singleLineComment = 0;
    let cmt = 0;
    let mixedCmt = 0;


    // Lặp qua tất cả các kí tự của File
    for (let index = 0; index < fileCodeLength; ++index) {

      // Đếm số dòng trong Block Comments
      if (fileCode[index] === "/" && fileCode[index + 1] === "*") {
        // Lấy ra dòng bắt đầu đếm code Block Comments
        let startCommentsBlock = index + 1;
        for (let i = startCommentsBlock; i < fileCodeLength; ++i) {
          if (fileCode[i] === "\n") {
            blockComment.lines += 1;
          }
          // Kiểm tra xem lúc nào hàm đóng thì break ra khỏi vòng lặp
          if (fileCode[i] === "*" && fileCode[i + 1] === "/") {
            blockComment.lines += 1;
            break;
          }
        }
      }
    }

    // Lặp qua tất cả các dòng của File
    for (var line = 0; line < arrLines.length - 1; line++) { // 1

      const [firstChar,...restCharsLine] = arrLines[line].trim();
      let comments = arrLines[line].includes('//');

      if(comments) {
        cmt += 1;
      }

      // Đếm dòng trống
      if (arrLines[line] === "") {
        emptyLines.lines += 1;
      }

      // Đếm số dòng Mixed
      if(restCharsLine.join('').includes('//')) {
        mixedCmt += 1;
      }
    }

    // Tinh ra số dòng vật lý
    linesPhysical.lines = arrLines.length - 1;

    

    // Tính số dòng Logical
    linesLogical.lines =
      linesPhysical.lines - commentsLine.lines - emptyLines.lines;

    // Tính tổng số dòng comments
    comment.lines = cmt + blockComment.lines;

    // Tinh Mixed Comments
    mixed.lines = mixedCmt;

    // Tính số dòng single comments line
    commentsLine.lines = comment.lines - mixed.lines - blockComment.lines;
  },
  start: function () {
    this.render(); // handle
    this.handleEvents(); // handle
  },
};

app.start();
