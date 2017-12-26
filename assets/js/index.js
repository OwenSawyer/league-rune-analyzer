
$(document).ready(function() {
    $("#searchSummonerForm").submit(function (e) {
        e.preventDefault();
        var data = $("#searchSummonerForm :input").serializeArray();
        console.log(data);
        $.ajax({
            url: '/api/summoner/',
            type: 'post',
            data: {
                'region' : data[1].value,
                'name' : data[0].value
            },
            success : function(response){
                var MatchHistoryUrl = "/results?accountId=" + response.accountId + "&name=" + response.name + "&region=" +  data[1].value;
                window.location.href = MatchHistoryUrl;
            },
            error : function(response){
                window.location.href = '/404';
            }
        })
    });
});