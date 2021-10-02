/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable eqeqeq */
/* eslint-disable vars-on-top */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import $ from 'jquery';

/* ------------------ Circular Progress Bar ------------------------*/
// $(() => {
//     $('.circlestat').circliful();
// });
/* ------------------ Circular Progress Bar ------------------------*/
// eslint-disable-next-line import/prefer-default-export
export const circularProgressBar = (function (a) {
    a.fn.circliful = function (b, d) {
        const c = a.extend(
            {
                fgcolor: '#556b2f',
                bgcolor: '#eee',
                fill: false,
                width: 15,
                dimension: 200,
                fontsize: 15,
                percent: 50,
                animationstep: 1,
                iconsize: '20px',
                iconcolor: '#999',
                border: 'default',
                complete: null,
            },
            b
        );
        return this.each(function () {
            const w = [
                'fgcolor',
                'bgcolor',
                'fill',
                'width',
                'dimension',
                'fontsize',
                'animationstep',
                'endPercent',
                'icon',
                'iconcolor',
                'iconsize',
                'border',
            ];
            const f = {};
            let F = '';
            let n = 0;
            const t = a(this);
            let A = false;
            let v;
            let G;
            let percent;
            t.addClass('circliful');
            e(t);
            if (t.data('text') != undefined) {
                v = t.data('text');
                if (t.data('icon') != undefined) {
                    F = a('<i></i>')
                        .addClass(`fa ${a(this).data('icon')}`)
                        .css({ color: f.iconcolor, 'font-size': f.iconsize });
                }
                if (t.data('type') != undefined) {
                    j = a(this).data('type');
                    if (j == 'half') {
                        s(t, 'circle-text-half', f.dimension / 1.45);
                    } else {
                        s(t, 'circle-text', f.dimension);
                    }
                } else {
                    s(t, 'circle-text', f.dimension);
                }
            }
            if (a(this).data('total') !== undefined && a(this).data('part') !== undefined) {
                const I = a(this).data('total') / 100;
                percent = (a(this).data('part') / I / 100).toFixed(3);
                n = (a(this).data('part') / I).toFixed(3);
            } else if (a(this).data('percent') != undefined) {
                percent = a(this).data('percent') / 100;
                n = a(this).data('percent');
            } else {
                percent = c.percent / 100;
            }
            if (a(this).data('info') !== undefined) {
                G = a(this).data('info');
                if (a(this).data('type') !== undefined) {
                    j = a(this).data('type');
                    if (j == 'half') {
                        D(t, 0.9);
                    } else {
                        D(t, 1.25);
                    }
                } else {
                    D(t, 1.25);
                }
            }
            a(this).width(`${f.dimension}px`);
            const i = a('<canvas></canvas>')
                .attr({ width: f.dimension, height: f.dimension })
                .appendTo(a(this))
                .get(0);
            const g = i.getContext('2d');
            const r = i.width / 2;
            const q = i.height / 2;
            const C = f.percent * 360;
            const H = C * (Math.PI / 180);
            const l = i.width / 2.5;
            let B = 2.3 * Math.PI;
            let z = 0;
            const E = false;
            let o = f.animationstep === 0 ? n : 0;
            const p = Math.max(f.animationstep, 0);
            let u = Math.PI * 2;
            let h = Math.PI / 2;
            // eslint-disable-next-line no-var
            var j = '';
            let k = true;
            if (a(this).data('type') != undefined) {
                j = a(this).data('type');
                if (j === 'half') {
                    B = 2 * Math.PI;
                    z = 3.13;
                    u = Math.PI * 1;
                    h = Math.PI / 0.996;
                }
            }
            function s(J, x, y) {
                a('<span></span>')
                    .appendTo(J)
                    .addClass(x)
                    .text(v)
                    .prepend(F)
                    .css({ 'line-height': `${y}px`, 'font-size': `${f.fontsize}px` });
            }
            function D(y, x) {
                a('<span></span>')
                    .appendTo(y)
                    .addClass('circle-info-half')
                    .css('line-height', `${f.dimension * x}px`);
            }
            function e(x) {
                a.each(w, (y, J) => {
                    if (x.data(J) != undefined) {
                        f[J] = x.data(J);
                    } else {
                        f[J] = a(c).attr(J);
                    }
                    if (J == 'fill' && x.data('fill') != undefined) {
                        A = true;
                    }
                });
            }
            function m(x) {
                g.clearRect(0, 0, i.width, i.height);
                g.beginPath();
                g.arc(r, q, l, z, B, false);
                g.lineWidth = f.width + 1;
                g.strokeStyle = f.bgcolor;
                g.stroke();
                if (A) {
                    g.fillStyle = f.fill;
                    g.fill();
                }
                g.beginPath();
                g.arc(r, q, l, -h, u * x - h, false);
                if (f.border == 'outline') {
                    g.lineWidth = f.width + 13;
                } else if (f.border == 'inline') {
                    g.lineWidth = f.width - 13;
                }
                g.strokeStyle = f.fgcolor;
                g.stroke();
                if (o < n) {
                    o += p;
                    requestAnimationFrame(() => {
                        m(Math.min(o, n) / 100);
                    }, t);
                }
                if (o == n && k && typeof b !== 'undefined') {
                    if (a.isFunction(b.complete)) {
                        b.complete();
                        k = false;
                    }
                }
            }
            m(o / 100);
            $(() => {
                $('.toTop').click(() => {
                    $('body,html').animate({ scrollTop: 0 }, 800);
                });
            });

            // $('select').each(function () {
            //     const $this = $(this);
            //     const numberOfOptions = $(this).children('option').length;
            //     $this.addClass('select-hidden');
            //     $this.wrap('<div class="select"></div>');
            //     $this.after('<div class="select-styled"></div>');
            //     const $styledSelect = $this.next('div.select-styled');
            //     $styledSelect.text($this.children('option').eq(0).text());
            //     const $list = $('<ul />', { class: 'select-options' }).insertAfter($styledSelect);
            //     for (let x = 0; x < numberOfOptions; x + 1) {
            //         $('<li />', {
            //             text: $this.children('option').eq(x).text(),
            //             rel: $this.children('option').eq(x).val(),
            //         }).appendTo($list);
            //     }
            //     const $listItems = $list.children('li');
            //     $styledSelect.click(function (et) {
            //         et.stopPropagation();
            //         $('div.select-styled.active')
            //             .not(this)
            //             .each(function () {
            //                 $(this).removeClass('active').next('ul.select-options').hide();
            //             });
            //         $(this).toggleClass('active').next('ul.select-options').toggle();
            //     });
            //     $listItems.click(function (et) {
            //         et.stopPropagation();
            //         $styledSelect.text($(this).text()).removeClass('active');
            //         $this.val($(this).attr('rel'));
            //         $list.hide(); // console.log($this.val());    });    $(document).click(function () {
            //         $styledSelect.removeClass('active');
            //         $list.hide();
            //     });
            // });

            // $('.dropdown').click(function () {
            //     $(this).attr('tabindex', 1).focus();
            //     $(this).toggleClass('active');
            //     $(this).find('.dropdown-menu').slideToggle(300);
            // });
            // $('.dropdown').focusout(function () {
            //     $(this).removeClass('active');
            //     $(this).find('.dropdown-menu').slideUp(300);
            // });
        });
    };
})($);
