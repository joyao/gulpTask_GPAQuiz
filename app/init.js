var SubjectObj = [
    {
        id: "subject1",
        name: "法規課程",
        info:
            "政府採購法之總則、招標及決標：是非 12 題；選擇 24 題<br>政府採購法之履約管理及驗收：是非 2 題；選擇 4 題<br>政府採購法之罰則及附則：是非 5 題；選擇 10 題<br>政府採購法之爭議處理：是非 4 題；選擇 8 題<br>是非：1 分/題；選擇：2 分/題",
        wsurl_MC:
            "https://script.google.com/macros/s/AKfycbw0cUYsP3gh3ypDIGIYjgoyszlsKvX88BjWSsw6urE7pYFNdho/exec",
        wsurl_TF:
            "https://script.google.com/macros/s/AKfycbwIKPgNzq2ooLh9wXzFru9_Q-Ja9AUV-m70WcECgQ/exec",
    },
    {
        id: "subject2",
        name: "實務課程",
        info:
            "工程及技術服務採購作業：是非 6 題；選擇 12 題<br>財物及勞務採購作業：是非 6 題；選擇 12 題<br>最有利標及評選優勝廠商：是非 6 題；選擇 12 題<br>電子採購實務：是非 6 題；選擇 12 題<br>是非：1 分/題；選擇：2 分/題",
        wsurl_MC:
            "https://script.google.com/macros/s/AKfycbzeaFLCgUwYfWGc0rxL3a1Un3NNIAKH6VncVg31rQ/exec",
        wsurl_TF:
            "https://script.google.com/macros/s/AKfycbyTrHsOgcLDKc5VrEYtHLy-gK-NXbKRuRxVsUcG/exec",
    },
    {
        id: "subject3",
        name: "其他課程",
        info:
            "錯誤採購態樣：是非 2 題；選擇 4 題<br>投標須知及招標文件製作：是非 4 題；選擇 8 題<br>採購契約：是非 4 題；選擇 8 題<br>底價及價格分析：是非 3 題；選擇 6 題<br>政府採購全生命週期概論：是非 4 題；選擇 8 題<br>道德規範及違法處置：是非 2 題；選擇 4 題<br>是非：1 分/題；選擇：2 分/題",
        wsurl_MC:
            "https://script.google.com/macros/s/AKfycbx5sKlLicMgexWN46sGVFVWf6FmR17A3zMAGmykbA/exec",
        wsurl_TF:
            "https://script.google.com/macros/s/AKfycbyo_NdhoXQbrO8NK2f2CWd-ocG39llm5N03JWFnkw/exec",
    },
];

function Quiz_MultipleChoice(
    id,
    question,
    option1,
    option2,
    option3,
    option4,
    answer,
    detail
) {
    this.id = id;
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.option3 = option3;
    this.option4 = option4;
    this.answer = answer;
    this.detail = detail;
}

function Quiz_TrueFalse(id, question, option1, option2, answer, detail) {
    this.id = id;
    this.question = question;
    this.option1 = option1;
    this.option2 = option2;
    this.answer = answer;
    this.detail = detail;
}

var QuizArr = [];

function getQuestions(id, type) {
    $("#quiztable").html("");
    $("#quizscore").html("");
    $("#submitQuiz").hide();
    $("#reQuiz").hide();
    $(".loader").fadeIn();
    var subject = SubjectObj.filter((item) => item.id === id)[0];

    $("#subjecttitle").attr("qvalue", id);
    $("#subjecttitle").attr("qtype", type);
    QuizArr = [];
    var url = subject.wsurl_MC;
    if (type === "MC") {
        url = subject.wsurl_MC;
        $("#subjecttitle").html(subject.name + "-選擇題 模擬試題");
    } else if (type === "TF") {
        url = subject.wsurl_TF;
        $("#subjecttitle").html(subject.name + "-是非題 模擬試題");
    }
    $("#subjectinfo").html(subject.info);
    $.getJSON(url, function (json_data) {
        console.log(json_data);
        var quiztablehtml = "";
        $.each(json_data, function (key, val) {
            var tmp;
            var temphtml;
            if (type === "MC") {
                //資料陣列
                //var tmp = new Quiz_MultipleChoice(val.data[2], val.data[3], val.data[4], val.data[5], val.data[6], val.data[1], val.data[7]);
                tmp = new Quiz_MultipleChoice(
                    "Q" + val.index,
                    val.data[2],
                    val.data[3],
                    val.data[4],
                    val.data[5],
                    val.data[6],
                    val.data[1],
                    val.data[7].toString().replace(/\n/g, "<br>")
                );
                QuizArr.push(tmp);
                temphtml =
                    '<div id="' +
                    tmp.id +
                    '" class="ui form">\
                              <div class="grouped fields">\
                                <label>' +
                    tmp.id +
                    ". " +
                    tmp.question +
                    '</label>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="1">\
                                    <label>' +
                    tmp.option1 +
                    '</label>\
                                  </div>\
                                </div>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="2">\
                                    <label>' +
                    tmp.option2 +
                    '</label>\
                                  </div>\
                                </div>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="3">\
                                    <label>' +
                    tmp.option3 +
                    '</label>\
                                  </div>\
                                </div>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="4">\
                                    <label>' +
                    tmp.option4 +
                    '</label>\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="ui hidden message detailanswer">\
                              </div>\
                            </div>';
            } else if (type === "TF") {
                tmp = new Quiz_TrueFalse(
                    "Q" + val.index,
                    val.data[2],
                    val.data[3],
                    val.data[4],
                    val.data[1],
                    val.data[5].toString().replace(/\n/g, "<br>")
                );
                QuizArr.push(tmp);
                temphtml =
                    '<div id="' +
                    tmp.id +
                    '" class="ui form">\
                              <div class="grouped fields">\
                                <label>' +
                    tmp.id +
                    ". " +
                    tmp.question +
                    '</label>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="1">\
                                    <label>' +
                    tmp.option1 +
                    '</label>\
                                  </div>\
                                </div>\
                                <div class="field">\
                                  <div class="ui radio checkbox">\
                                    <input type="radio" name="' +
                    tmp.id +
                    '" value="2">\
                                    <label>' +
                    tmp.option2 +
                    '</label>\
                                  </div>\
                                </div>\
                              </div>\
                              <div class="ui hidden message detailanswer">\
                              </div>\
                            </div>';
            }

            quiztablehtml += "<tr><td>" + temphtml + "</td></tr>";
        });
        $("#quiztable").show();
        $("#submitQuiz").show();
        $("#quiztable").html(quiztablehtml);
        $(".loader").fadeOut();
    });
}

function submitQuiz() {
    var gtype = $("#subjecttitle").attr("qtype");
    if ($("#quiztable input:checked").length === QuizArr.length) {
        if (confirm("確定提交？")) {
            $(".ui.checkbox").checkbox("set disabled");
            var score = 0;
            QuizArr.forEach(function (item, index) {
                if ($("#" + item.id + " input:checked").length === 0) {
                    alert("請填寫完整");
                    return false;
                } else {
                    var useranswer = $("#" + item.id + " input:checked")[0]
                        .value;
                    var realanswer = item.answer;
                    var oneQuizanswer = $("#" + item.id + " .detailanswer");
                    if (useranswer.toString() === realanswer.toString()) {
                        $("#" + item.id + " .detailanswer").addClass(
                            "positive"
                        );
                        $("#" + item.id + " .detailanswer").html(
                            "詳解：<br>" + item.detail
                        );
                        if (gtype === "MC") {
                            score += 2;
                        } else if (gtype === "TF") {
                            score += 1;
                        }
                    } else {
                        $("#" + item.id + " label").css("color", "red");
                        $("#" + item.id + " .detailanswer").addClass(
                            "negative"
                        );
                        if (gtype === "MC") {
                            $("#" + item.id + " .detailanswer").html(
                                "答案為：(" +
                                    item.answer +
                                    ")<br>詳解：<br>" +
                                    item.detail
                            );
                        } else if (gtype === "TF") {
                            $("#" + item.id + " .detailanswer").html(
                                "答案為：(" +
                                    (item.answer.toString() === "1"
                                        ? "O"
                                        : "X") +
                                    ")<br>詳解：<br>" +
                                    item.detail
                            );
                        }
                    }

                    if (index === QuizArr.length - 1) {
                        if (gtype === "MC") {
                            $("#quizscore").html(
                                "分數：" +
                                    score.toString() +
                                    "/" +
                                    (QuizArr.length * 2).toString() +
                                    " = " +
                                    ((score / (QuizArr.length * 2)) * 100)
                                        .toFixed(2)
                                        .toString() +
                                    "%"
                            );
                        } else if (gtype === "TF") {
                            $("#quizscore").html(
                                "分數：" +
                                    score.toString() +
                                    "/" +
                                    QuizArr.length.toString() +
                                    " = " +
                                    ((score / QuizArr.length) * 100)
                                        .toFixed(2)
                                        .toString() +
                                    "%"
                            );
                        }
                        $("#quizscore").show();
                        $(".ui.message.detailanswer").removeClass("hidden");
                        $("#submitQuiz").hide();
                        $("#reQuiz").show();
                        $("html,body").animate({ scrollTop: 0 }, 500);
                    }
                }
            });
        }
    } else {
        QuizArr.every(function (item, index, arry) {
            if ($("#" + item.id + " input:checked").length === 0) {
                $("html, body").animate(
                    {
                        scrollTop:
                            $("#" + item.id).offset().top -
                            $("#subjecttitle").offset().top,
                    },
                    1000
                );
            } else {
                return true;
            }
        });
    }
}

function reQuiz() {
    $("#quizscore").html("");
    $("#reQuiz").hide();
    getQuestions(
        $("#subjecttitle").attr("qvalue"),
        $("#subjecttitle").attr("qtype")
    );
}
