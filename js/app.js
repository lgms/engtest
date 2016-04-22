jQuery(function ($) {
    FastClick.attach(document.body);

    $('.close').on('click', function () {
        $(this).parents('.tips').hide();
    });

    $('.replayBtn').on('click', function () {
        //        $('.share_overmask').addClass('show');
        reset();
    });
    $('.share_overmask').on('click', function () {
        $(this).removeClass('show');
    });

    //开始测试按钮
    $('.btn_1').on('click', function () {
        //        console.log($('.words_1 input:checked').val())
        getJson($('.words_1 input:checked').val());

    });

    function start() {
        $('.btn_1').parents('.block_1').hide().siblings('.block_2').show();
        pp_config.sort(randomsort);
        for (var i = 0; i < pp_config.length; i++) {
            pp_config[i].options.sort(randomsort);
        }
        setNext();
    }

    var result_arr = [];
    var wrongs = 0;
    var curr = 0;
    var myscore = 0;
    var pp_config = [];

    function reset() {
        result_arr = [];
        wrongs = 0;
        curr = 0;
        myscore = 0;
        pp_config = [];
        $('.block_1').show().siblings('.block_2').hide();
    }

    $('.checkList').on('click', ' dl dd', function () {
        if ($(this).attr('name') == 'radio') {
            //            $(this).removeClass();
            $('.checkList dl dd a').removeAttr('style');
            $(".proCon dd").removeClass();
            //            console.log($('.checkList dl dd a'))
            $(this).addClass('cur').siblings('dd').removeClass('cur');

        }
        /*else if ($(this).hasClass('cur') && $(this).attr('name') != 'radio') {
            $(this).removeClass('cur');
        } else {
            $(this).addClass('cur');
        }*/
    });


    $('.nextBtn').on('click', function () {
        if ($(".proCon dd.cur").length == 0) {
            return false;
        }
        $(".proCon dd.cur").each(function (index) {
//            console.log(pp_config[curr - 1].correct, $(this).attr('data-id'),wrongs,$('.checkList dl dd.cur a').css('background-color'));
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
                if ($('.checkList dl dd.cur a').css('background-color') != 'rgb(255, 74, 74)') {
                    $('.checkList dl dd.cur a').css('background-color', '#FF4A4A');
                    //console.log($('.checkList dl').parent())
                    $('.checkList dl dd').each(function () {
                        if ($(this).attr('data-id') == pp_config[curr - 1].correct) {
                            $(this).addClass('cur2');
                            $(this).find('a').css('background-color', '#8FF775');
                        }
                    });
                    wrongs++;
                }
                //                return false;
            }

        });

    });

    //ajax load data
    function getJson(name) {
        $.ajax({
            type: "GET",
            url: "data/" + name + ".json",
            dataType: "json",
            success: function (data) {
                pp_config = data
                start();
            }
        });

    }



    //最精简的数组打乱函数
    function randomsort(a, b) {
        return Math.random() > .5 ? -1 : 1; //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
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


    //    $('#input-1, #input-2').iCheck({radioClass: 'iradio_square-blue',increaseArea: '20%'});
})