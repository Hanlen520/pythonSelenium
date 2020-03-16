/**
 * 修改案件状态（单个）
 */
function update_case_status(pro_name, test_method_name, nginx_api_proxy) {
    // 调用ajax请求(同步)
    var request_url = "/" + nginx_api_proxy + "/WEB/set_case_status/" + pro_name + "/" + test_method_name
    var response_info = request_interface_url_v2(url=request_url, method="GET", async=false);
    if(response_info != "请求失败"){
        if(response_info.data.new_status == true){
            $("#off_line_" + test_method_name).html("上 线");
            $("#off_line_" + test_method_name).removeClass("btn btn-danger btn-sm").addClass("btn btn-success btn-sm");
            $("#off_line_" + test_method_name + "_tr").removeClass("passClass danger").addClass("passClass success");
        }else{
            $("#on_line_" + test_method_name).html("下 线");
            $("#on_line_" + test_method_name).removeClass("btn btn-success btn-sm").addClass("btn btn-danger btn-sm");
            $("#on_line_" + test_method_name + "_tr").removeClass("passClass success").addClass("passClass danger");
        }
    }
}


/**
 * 修改案件状态（所有）
 */
function update_case_status_all(pro_name, status, nginx_api_proxy) {
    // 调用ajax请求(同步)
    var request_url = "/" + nginx_api_proxy + "/WEB/set_case_status_all/" + pro_name + "/" + status
    var response_info = request_interface_url_v2(url=request_url, method="GET", async=false);
    if(response_info != "请求失败"){
        $.each(response_info.data.test_method_name_list,function (i, test_method_name) {
            if(status == "true"){
                $("#off_line_" + test_method_name).html("上 线");
                $("#off_line_" + test_method_name).removeClass("btn btn-danger btn-sm").addClass("btn btn-success btn-sm");
                $("#off_line_" + test_method_name + "_tr").removeClass("passClass danger").addClass("passClass success");
            }else{
                $("#on_line_" + test_method_name).html("下 线");
                $("#on_line_" + test_method_name).removeClass("btn btn-success btn-sm").addClass("btn btn-danger btn-sm");
                $("#on_line_" + test_method_name + "_tr").removeClass("passClass success").addClass("passClass danger");
            }
        })
    }
}


/**
 * 批量执行
 */
function run_case(pro_name, nginx_api_proxy) {
     // 将按钮禁灰不可点击
    var btn = document.getElementById("run_case");
    btn.setAttribute('disabled', 'true');

    // 改变当前查询状态
    $("#run_result").html(" 处 理 中 。。。");
    $("#run_result").removeClass().addClass("label label-info");

    // 调用ajax请求(同步)
    var request_url = "/" + nginx_api_proxy + "/WEB/sync_run_case/" + pro_name
    var data_dict = {"browser_name": "Chrome", "thread_num": 2}
    var response_info = request_interface_url_v2(url=request_url, method="POST", data=data_dict, async=false);
    if(response_info != "请求失败"){
        $("#run_result").html(response_info.msg);
        if(response_info.msg == "测试用例执行中"){
            $("#run_result").removeClass().addClass("label label-success");
        }else{
            $("#run_result").removeClass().addClass("label label-warning");
        }
        // 将按钮还原可点击
        // var btn = document.getElementById("run_case");
        // btn.removeAttribute('disabled');
    }else{
        $("#run_result").html(response_info);
        $("#run_result").removeClass().addClass("label label-danger");
        // 将按钮还原可点击
        // var btn = document.getElementById("run_case");
        // btn.removeAttribute('disabled');
    }
}