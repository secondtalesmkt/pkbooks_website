
$(function(){
    if ($("#usa-vectormap").length) {
        $('#usa-vectormap').vectorMap({
            map: "us_lcc",
            backgroundColor: "#F6F6F6",
            regionStyle: {
                initial: {
                    fill: "#30303080"
                },
                hover: {
                    fill: "#93C5FD",
                    "fill-opacity": 1,
                }
            },
            series: {
                regions: [{
                values: Data,
                scale: ['#93C5FD','#0057B8'],
                normalizeFunction: 'polynomial'
                }]
            },
            onRegionLabelShow: function(e, el, code){
                el.html(el.html()+' '+Data[code]+'%');
            }
        });
    }
    if ($("#usa-vectormap2").length) {
        $('#usa-vectormap2').vectorMap({
            map: "us_lcc",
            backgroundColor: "#F6F6F6",
            regionStyle: {
                initial: {
                    fill: "#30303080"
                },
                hover: {
                    fill: "#93C5FD",
                    "fill-opacity": 1,
                }
            },
            series: {
                regions: [{
                values: Data,
                scale: ['#93C5FD','#0057B8'],
                normalizeFunction: 'polynomial'
                }]
            },
            onRegionLabelShow: function(e, el, code){
                el.html(el.html()+' '+Data[code]+'%');
            }
        });
    }
});