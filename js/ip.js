var ip_list = document.getElementById('iplist').value;
var ip_list_result = document.getElementById('iplist_result');
var splitted;

var range_subnetmask_octec3;

function Get_ip_slipt(ip_net)
{
    return ip_net.split('/');
}

function Get_ip_octec(ip_origin)
{
    return ip_origin.split('.');
}

function Get_octec3_range(ip_subnetmask)
{
    var octec3_bit = 0;
    if (ip_subnetmask>=24)
    {
        octec3_bit = 0;
    }
    else if(ip_subnetmask <= 16)
    {
        octec3_bit = 8;
    }
    else
    {
        octec3_bit = 24 - ip_subnetmask;
    }
    var octec3_range = 2**octec3_bit;
    return octec3_range;
}

function IpGenerate()
{
    var result_iplist_arr = [];
    var ip_list = document.getElementById('iplist').value;
    splitted = ip_list.split("\n");  
    // console.log(splitted);
    for (var ip_net of splitted) {
        var ip_net_slipt = Get_ip_slipt(ip_net);
        var ip_origin = ip_net_slipt[0];
        var ip_subnetmask = ip_net_slipt[1];

        var ip_octec = Get_ip_octec(ip_origin);
        var ip_octec1 = ip_octec[0];
        var ip_octec2 = ip_octec[1];
        var ip_octec3 = ip_octec[2];
        var ip_octec4 = ip_octec[3];
        var octec3_range = Get_octec3_range(ip_subnetmask);
        var new_ip;
        for (let i = 0; i < octec3_range; i++) {
            var new_octec3 = parseInt(ip_octec3) + i;
            var octec4_arr = get_octec4_arr();
            for (var new_octec4 of octec4_arr) {               
                var new_ip_octec = [ip_octec1, ip_octec2, new_octec3, new_octec4];
                new_ip = new_ip_octec.join('.')
                result_iplist_arr.push(new_ip);
            }
        }
    }
    var isShuffleIpList = document.getElementById("shuffle_checkbox").checked;
    if (isShuffleIpList == true)
    {
        result_iplist_arr.shuffle();
    }
    result_list = result_iplist_arr.join('\n')

    ip_list_result.value = result_list;
}

// Function to generate random number in range min to max
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
} 

var number_ips = 3;
// Generate octec 4 array
function get_octec4_arr() {
    var octec4_arr = [];
    var octec4;
    var number_ips_input = document.getElementById('ip_number').value;
    if (number_ips_input == '')
    {
        number_ips_input = number_ips;
    }
    while(octec4_arr.length < number_ips_input){
        octec4 = randomNumber(3,250);        
        if(octec4_arr.indexOf(octec4) === -1) octec4_arr.push(octec4);
    }

    return octec4_arr;    
}

// Shuffle a array
Array.prototype.shuffle = function() {
    let m = this.length, i;
    while (m) {
      i = (Math.random() * m--) >>> 0;
      [this[m], this[i]] = [this[i], this[m]]
    }
    return this;
}