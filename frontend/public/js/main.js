$(() => {
    function ScrolClass() {
        if ($(this).scrollTop() >= 50) {
            $('.topMenu').addClass('topMenu-fixed');
        } else {
            $('.topMenu').removeClass('topMenu-fixed');
        }
    }
    $(window).scroll(() => {
        ScrolClass();
    });
    $(document).ready(() => {
        ScrolClass();
    });
});

$('.buttonDrop').click(function () {
    $(`.${$(this).attr('data-class')}`).toggleClass('active');
    $(this).toggleClass('active');
});

$('.tab-button').click(function () {
    $('.tab-button').removeClass('active');
    $(this).addClass('active');
    $('.tab-block').removeClass('active');
    $(`#${$(this).attr('data-tab')}`).addClass('active');
});
$('.tab-button-media').click(function () {
    $('.tab-button-media').removeClass('active');
    $(this).addClass('active');
    $('.tab-block-media').removeClass('active');
    $(`#${$(this).attr('data-tab')}`).addClass('active');
});

$(() => {
    $('.toTop').click(() => {
        $('body,html').animate({ scrollTop: 0 }, 800);
    });
});

// var swiper = new Swiper('.swiper-slider', {
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     pagination: {
//         el: '.swiper-pagination',
//         clickable: 'true',
//     },
//     speed: 1000,
//     autoplay: true,
// });

// var swiper = new Swiper('.swiper-carousel-1', {
//     slidesPerView: 3,
//     spaceBetween: 30,
//     navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//     },
//     speed: 1000,
//     autoplay: true,
// });

function tamingselect() {
    if (!document.getElementById && !document.createTextNode) {
        return;
    }

    // Classes for the link and the visible dropdown
    const ts_selectclass = 'turnintodropdown'; // class to identify selects
    const ts_listclass = 'turnintoselect'; // class to identify ULs
    const ts_boxclass = 'dropcontainer'; // parent element
    const ts_triggeron = 'activetrigger'; // class for the active trigger link
    const ts_triggeroff = 'trigger'; // class for the inactive trigger link
    const ts_dropdownclosed = 'dropdownhidden'; // closed dropdown
    const ts_dropdownopen = 'dropdownvisible'; // open dropdown
    /*
	Turn all selects into DOM dropdowns
*/
    let count = 0;
    const toreplace = new Array();
    const sels = document.getElementsByTagName('select');
    for (var i = 0; i < sels.length; i++) {
        if (ts_check(sels[i], ts_selectclass)) {
            const hiddenfield = document.createElement('input');
            hiddenfield.name = sels[i].name;
            hiddenfield.type = 'hidden';
            hiddenfield.id = sels[i].id;
            hiddenfield.value = sels[i].options[0].value;
            sels[i].parentNode.insertBefore(hiddenfield, sels[i]);
            const trigger = document.createElement('a');
            ts_addclass(trigger, ts_triggeroff);
            trigger.href = '#';
            trigger.onclick = function () {
                ts_swapclass(this, ts_triggeroff, ts_triggeron);
                ts_swapclass(
                    this.parentNode.getElementsByTagName('ul')[0],
                    ts_dropdownclosed,
                    ts_dropdownopen
                );
                return false;
            };
            trigger.appendChild(document.createTextNode(sels[i].options[0].text));
            sels[i].parentNode.insertBefore(trigger, sels[i]);
            const replaceUL = document.createElement('ul');
            for (var j = 0; j < sels[i].getElementsByTagName('option').length; j++) {
                const newli = document.createElement('li');
                const newa = document.createElement('a');
                newli.v = sels[i].getElementsByTagName('option')[j].value;
                newli.elm = hiddenfield;
                newli.istrigger = trigger;
                newa.href = '#';
                newa.appendChild(
                    document.createTextNode(sels[i].getElementsByTagName('option')[j].text)
                );
                newli.onclick = function () {
                    this.elm.value = this.v;
                    ts_swapclass(this.istrigger, ts_triggeron, ts_triggeroff);
                    ts_swapclass(this.parentNode, ts_dropdownopen, ts_dropdownclosed);
                    this.istrigger.firstChild.nodeValue = this.firstChild.firstChild.nodeValue;
                    return false;
                };
                newli.appendChild(newa);
                replaceUL.appendChild(newli);
            }
            ts_addclass(replaceUL, ts_dropdownclosed);
            const div = document.createElement('div');
            div.appendChild(replaceUL);
            ts_addclass(div, ts_boxclass);
            sels[i].parentNode.insertBefore(div, sels[i]);
            toreplace[count] = sels[i];
            count++;
        }
    }

    /*
	Turn all ULs with the class defined above into dropdown navigations
*/

    const uls = document.getElementsByTagName('ul');
    for (var i = 0; i < uls.length; i++) {
        if (ts_check(uls[i], ts_listclass)) {
            const newform = document.createElement('form');
            const newselect = document.createElement('select');
            for (j = 0; j < uls[i].getElementsByTagName('a').length; j++) {
                const newopt = document.createElement('option');
                newopt.value = uls[i].getElementsByTagName('a')[j].href;
                newopt.appendChild(
                    document.createTextNode(uls[i].getElementsByTagName('a')[j].innerHTML)
                );
                newselect.appendChild(newopt);
            }
            newselect.onchange = function () {
                window.location = this.options[this.selectedIndex].value;
            };
            newform.appendChild(newselect);
            uls[i].parentNode.insertBefore(newform, uls[i]);
            toreplace[count] = uls[i];
            count++;
        }
    }
    for (i = 0; i < count; i++) {
        toreplace[i].parentNode.removeChild(toreplace[i]);
    }
    function ts_check(o, c) {
        return new RegExp(`\\b${c}\\b`).test(o.className);
    }
    function ts_swapclass(o, c1, c2) {
        const cn = o.className;
        o.className = !ts_check(o, c1) ? cn.replace(c2, c1) : cn.replace(c1, c2);
    }
    function ts_addclass(o, c) {
        if (!ts_check(o, c)) {
            o.className += o.className == '' ? c : ` ${c}`;
        }
    }
}

window.onload = function () {
    tamingselect();
    // add more functions if necessary
};
