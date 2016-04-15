jQuery(function ($) {
    $('.close').on('click', function () {
        $(this).parents('.tips').hide();
    });

    $('.shareBtn').on('click', function () {
        $('.share_overmask').addClass('show');
    });
    $('.share_overmask').on('click', function () {
        $(this).removeClass('show');
    });

    //开始测试按钮
    $('.btn_1').on('click', function () {
        $(this).parents('.block_1').hide().siblings('.block_2').show();
        pp_config.sort(randomsort);
        for (var i = 0; i < pp_config.length; i++) {
            pp_config[i].options.sort(randomsort);
        }
        setNext();
    });

    var result_arr = [];
    var wrongs = 0;
    var curr = 0;
    var myscore = 0;
    var pp_config = [];

    $('.checkList').on('click', ' dl dd', function () {
        if ($(this).attr('name') == 'radio') {
            //            $(this).removeClass();
            $('.checkList dl dd a').removeAttr('style');
            $(".proCon dd").removeClass('cur');
            //            console.log($('.checkList dl dd a'))
            $(this).addClass('cur').siblings('dd').removeClass('cur');

        } else if ($(this).hasClass('cur') && $(this).attr('name') != 'radio') {
            $(this).removeClass('cur');
        } else {
            $(this).addClass('cur');
        }
    });


    $('.nextBtn').on('click', function () {
        if ($(".proCon dd.cur").length == 0) {
            return false;
        }
        $(".proCon dd.cur").each(function (index) {
            console.log(pp_config[curr - 1].correct, $(this).attr('data-id'));
            if (pp_config[curr - 1].correct == $(this).attr('data-id')) {
                $('.checkList dl dd.cur a').css('background-color', '#8FF775');

                //                result_arr.push($(this).attr('data-id'));
                if (curr == pp_config.length) {
                    // $('.adAnswer,.problem').hide();
                    //                     $('.over').show();

                    getResult();
                    $(this).parents('.block_2').hide().siblings('.block_3').show();
                    return false;
                }
                setNext();
            } else {
                $('.checkList dl dd.cur a').css('background-color', '#FF4A4A');
                //                console.log($('.checkList dl').parent())
                $('.checkList dl dd').each(function () {
                    if ($(this).attr('data-id') == pp_config[curr - 1].correct) {
                        $(this).addClass('cur');
                        $(this).find('a').css('background-color', '#8FF775');
                    }
                });
                wrongs++;
                return false;
            }

        });
        //result check

        //        setNext();
    });

    //题库
    pp_config = [
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

    //最精简的数组打乱函数
  function randomsort(a, b) {
        return Math.random()>.5 ? -1 : 1;//用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
  }


    //设置下一题的题目
    function setNext() {
        var opt = ['A)', 'B)', 'C)', 'D)'];
        var ss = '';
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
            ss += '<dd name="radio" data-id="' + item.options[i].id + '"><a href="#">' + opt[i] + ' ' + item.options[i].text + '</a></dd>';
        }
        ss += '</dl>';
        curr++;
        $('.proCon').html(ss);
    }

    //获取结果
    function getScore() {
        //        console.log(wrongs, ((pp_config.length - wrongs) / pp_config.length) * 100)

        var score = ((pp_config.length - wrongs) / pp_config.length) * 100;
        return score;
        //location.href = 'over.html?score='+score;
    }

    function getResult() {
        var score = getScore();
        console.log(score)
        var ss = '<P>' + 'Your score is:</P><P><span>' + score + '</span></P>';
       
        $('.result_vv').html(ss);
    }
})