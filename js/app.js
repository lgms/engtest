Zepto(function ($) {
    $('.close').on('click', function () {
        $(this).parents('.tips').hide();
    });

    $('.shareBtn').on('click', function () {
        $('.share_overmask').addClass('show');
    });
    $('.share_overmask').on('click', function () {
        $(this).removeClass('show');
    });
    $('.checkList').on('click', ' dl dd', function () {
        if ($(this).attr('name') == 'radio') {
            $(this).addClass('cur').siblings('dd').removeClass('cur');
        } else if ($(this).hasClass('cur') && $(this).attr('name') != 'radio') {
            $(this).removeClass('cur');
        } else {
            $(this).addClass('cur');
        }
    });

//    var results = [];
    var pp_config = [
  {
    "title": "Everyone had an application form in his hand, but no one knew which office room _______.",
    "options": [
      {
        "id": "a",
        "text": "to send it to"
      },
      {
        "id": "b",
        "text": "to send it"
      },
      {
        "id": "c",
        "text": "to be sent to"
      },
      {
        "id": "d",
        "text": "to have it send"
      }
    ],
    "correct": "a",
    "chs": "",
    "tip": "send it to which offic room"
  },
  {
    "title": "When I caught him ______ me, I stopped buying things there and started dealing with another shop.",
    "options": [
      {
        "id": "a",
        "text": "to cheat"
      },
      {
        "id": "b",
        "text": "cheat"
      },
      {
        "id": "c",
        "text": "cheating"
      },
      {
        "id": "d",
        "text": " to be cheating"
      }
    ],
    "correct": "c",
    "chs": "",
    "tip": "caught him cheating 发现他的欺诈行为"
  },
  {
    "title": "Helen was much kinder to her youngest brother than she was to the others, ___________, of course, made the others jealous.",
    "options": [
      {
        "id": "a",
        "text": "who"
      },
      {
        "id": "b",
        "text": "what"
      },
      {
        "id": "c",
        "text": "that"
      },
      {
        "id": "d",
        "text": "which"
      }
    ],
    "correct": "d",
    "chs": "",
    "tip": "引导的非限定语从句，对前句补充说明"
  },
  {
    "title": "“You are very selfish. It’s high time you _______ that you are not the most important person in the world,” Edgar said to his boss angrily.",
    "options": [
      {
        "id": "a",
        "text": "realized"
      },
      {
        "id": "b",
        "text": "have realized"
      },
      {
        "id": "c",
        "text": "realize"
      },
      {
        "id": "d",
        "text": "should realize"
      }
    ],
    "correct": "a",
    "chs": "你太自私了，是时候让你明白你不是这世界上最重要的人的道理，埃德加努气冲冲地向老板讲道。",
    "tip": "It's high time 形式主语"
  },
  {
    "title": " Had he worked harder in the last semester, he _____________ the exams.",
    "options": [
      {
        "id": "a",
        "text": "must have got through"
      },
      {
        "id": "b",
        "text": "would have got through"
      },
      {
        "id": "c",
        "text": "would get through"
      },
      {
        "id": "d",
        "text": "could get through"
      }
    ],
    "correct": "b",
    "chs": "",
    "tip": ""
  }
];
     

    var result_arr = [];
    var curr = 0;
    var myscore = 0;
    //开始测试按钮
    $('.btn_1').on('click', function () {
        $(this).parents('.block_1').hide().siblings('.block_2').show();
        setNext();
    });
  
    
    $('.nextBtn').on('click', function () {
        if ($(".proCon dd.cur").length == 0) {
            return false;
        }
        $(".proCon dd.cur").each(function (index) {
            result_arr.push($(this).attr('data-id'));
        });
        if (curr == pp_config.length) {
            // $('.adAnswer,.problem').hide();
            // $('.over').show();
            getResult();
            $(this).parents('.block_2').hide().siblings('.block_3').show();
            return false;
        }
        setNext();
    });

    //设置下一题的题目
    function setNext() {
        var opt = ['A)','B)','C)','D)'];
        var ss='';
        var item = pp_config[curr];
        $('.lineTitle').html((curr + 1) + '/' + pp_config.length);
        $('.lineCur').css('width', (curr + 1) / pp_config.length * 100 + '%');
//        var ss = '<h3>单选</h3>';
//        var type = "radio";
//        if (item.type == 2) {
//            ss = '<h3 class="red">多选</h3>';
//            type = "checkBox";
//        }
        ss += '<dl><dt>' + (curr + 1) + '. ' + item.title + '</dt>';
        for (var i = 0; i < item.options.length; i++) {
            ss += '<dd name="radio" data-id="1_' +(i+1)  + '"><a href="#">'+ opt[i]+''+ item.options[i].text + '</a></dd>';
        }
        ss += '</dl>';
        curr++;
        $('.proCon').html(ss);
    }

    //获取结果
    function getScore() {
        var score = 1;
        var allCon = 0;
        $.each(result_arr, function (index, itemv) {
            var item = itemv.split('_');
            var itemTitle = pp_config[item[0] - 1].text;
            var itemInfo = pp_config[item[0] - 1].data[item[1] - 1];
            var cArr = itemInfo.withConflict;
            score *= itemInfo.score;
            var conflict = 0;
            window.console.log(cArr);
            $.each(cArr, function (index, cv) {
                if ($.inArray(cv, result_arr) >= 0) {
                    conflict++;
                    allCon++;
                    window.console.log(itemv + '与' + cv + '冲突，触发谎言');
                }
            });
            window.console.log('score:' + score);
            window.console.log(item[0] + ':' + item[1] + ',title:' + itemTitle + ',conflict:' + conflict);
        });
//        switch (allCon) {
//        case 0:
//            break;
//        case 1:
//            score *= lie_config[1];
//            break;
//        case 2:
//            score *= lie_config[2];
//            break;
//        default:
//            score *= lie_config[3];
//            break;
//        }
        window.console.log('score:' + score);
        return score;
        //location.href = 'over.html?score='+score;
    }

    function getResult() {
        var score = getScore();

        var ss = '<P>' + '您';
        if (score < 0) {
            ss += '，小手乱选了吧？信用其实很值钱的哦!</P>';
        } else if (score == 0) {
            ss += '，小脸通红，说谎不打草稿，信用其实很值钱的哦!</P>';
        } else if (score > 0 && score < 5000) {
            ss += '的信用值</P><P><span>一台iPad mini</span></P>';
        } else if (score >= 5000 && score < 9000) {
            ss += '的信用值</P><P><span>一台土豪金</span></P>';
        } else if (score >= 9000 && score < 14000) {
            ss += '的信用值</P><P><span>两台 iPhone 6</span></P>';
        } else if (score >= 14000 && score < 20000) {
            ss += '的信用可以</P><P><span>香港豪华游一次</span></P>';
        } else if (score >= 20000 && score < 30000) {
            ss += '的信用值</P><P><span>一只LV包包</span></P>';
        } else if (score >= 30000 && score < 50000) {
            ss += '的信用值</P><P><span>一书包土豪金</span></P>';
        } else if (score >= 50000 && score < 70000) {
            ss += '的信用值</P><P><span>一箱子土豪金</span></P>';
        } else if (score >= 70000 && score < 90000) {
            ss += '的信用值</P><P><span>一辆大卡车</span></P>';
        } else if (score >= 90000 && score < 110000) {
            ss += '的信用值</P><P><span>一克拉钻戒</span></P>';
        } else if (score >= 110000 && score < 150000) {
            ss += '的信用值</P><P><span>一辆进口车</span></P>';
        } else if (score >= 150000 && score < 200000) {
            ss += '的信用值</P><P><span>上海内环厕所一间</span></P>';
        } else if (score >= 200000 && score < 300000) {
            ss += '的信用值</P><P><span>一辆宝马MINI</span></P>';
        } else if (score >= 300000) {
            ss += '的信用值</P><P><span>一辆奔驰</span></P>';
        }
        window.console.log('xxx' + ss);
        $('.result_vv').html(ss);
    }
})