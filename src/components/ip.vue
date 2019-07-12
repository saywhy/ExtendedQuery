<template>
    <div class="ip">
        <div class="title">IP查询</div>
        <div class="container">
            <div class="report clearfix">
                <div class="report_top clearfix">
                    <div class="report_top_title_box">
                        <div class="report_top_title_box_left">
                            <span class="report_top_title">Report for IP Address: </span>
                            <span class="report_top_name" :class="{red:ip_data.Zone=='Red',yellow:ip_data.Zone=='Yellow',grey:ip_data.Zone=='Grey',green:ip_data.Zone=='Green'}">{{ip_data.Zone_hoohoolab}}</span>
                        </div>
                        <!-- <div class="report_top_title_box_right">
                            <img class="report_top_title_box_right_img" src="../common/image/ip/a.png" alt="">
                            <span class="report_top_title_box_right_span">Copy Request</span>
                            <img class="report_top_title_box_right_img" src="../common/image/ip/down.png" alt="">
                            <span class="report_top_title_box_right_span">Export all results</span>
                        </div> -->
                    </div>
                    <div class="report_top_bom">
                        <img src="" alt="">
                        <span>{{indicator}}</span>
                    </div>
                </div>
                <div class="report_mid">
                    <el-row class="report_mid_item">
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Hits</p>
                            <p class="report_mid_item_col_value">{{ip_data.IpGeneralInfo.HitsCount}}</p>
                            <p class="report_mid_item_col_name">Owner ID</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.WHOIS">
                                    {{ip_data.IpWhoIs.Contacts[0].OrganizationId}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Owner name</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.WHOIS">
                                    {{ip_data.IpWhoIs.Contacts[0].Name}}
                                </span>
                            </p>
                            <p class="report_mid_item_col_name">Updated</p>
                            <p class="report_mid_item_col_value" v-if="item_type.WHOIS">
                                {{ip_data.IpWhoIs.Net.Changed}}
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Create</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.WHOIS">
                                    {{ip_data.IpWhoIs.Net.Created}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">First Seen</p>
                            <p class="report_mid_item_col_value">{{ip_data.IpGeneralInfo.FirstSeen}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div class="report_bom">
                    <span>Categories:</span>
                    <span class="report_bom_box">
                        <span v-for="item in ip_data.IpGeneralInfo.Categories" v-if="ip_data.IpGeneralInfo.Categories.length!=0">
                            <img class="report_bom_img" src="../common/image/ip/span.png" alt="">
                            <span class="report_bom_span">{{item}}</span>
                        </span>
                        <span v-if="ip_data.IpGeneralInfo.Categories.length==0">
                            <img class="report_bom_img" src="../common/image/ip/span.png" alt="">
                            <span class="report_bom_span">General</span>
                        </span>
                    </span>
                </div>
            </div>
            <div class="whois clearfix" v-if="item_type.WHOIS">
                <div class="whois_top ">
                    <span class="whois_top_name">WHOIS</span>
                    <!-- <img class="whois_top_img" src="../common/image/ip/info.png" alt=""> -->
                </div>
                <div class="whois_mid ">
                    <el-row class="whois_mid_item">
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">IP Range</p>
                            <p class="whois_mid_item_col_value">
                                <span>{{ip_data.IpWhoIs.Net.RangeStart}}</span>
                                <span>-</span>
                                <span>{{ip_data.IpWhoIs.Net.RangeEnd}}</span>
                            </p>
                            <p class="whois_mid_item_col_name">Changed</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Net.Changed}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Net Name</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Net.Name}}</p>
                            <p class="whois_mid_item_col_name">AS Description</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Asn[0].Description_cn}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Net Description</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Net.Description}}</p>
                            <p class="whois_mid_item_col_name">ASN</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Asn[0].Number}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Created</p>
                            <p class="whois_mid_item_col_value">{{ip_data.IpWhoIs.Net.Created}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div class="whois_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Contracts</th>
                            <th>Name</th>
                            <th style="width: 100px;">Type</th>
                            <th style="width: 400px;">Address</th>
                            <th>Phone/Fax</th>
                            <th style="padding-right:36px;">Email</th>
                        </tr>
                        <tr v-for="item in ip_data.IpWhoIs.Contacts">
                            <td style="padding-left:36px;" :title="item.ContactType">{{item.ContactType}}</td>
                            <td :title="item.Name">{{item.Name}}</td>
                            <td>-</td>
                            <td style="width: 300px;">
                                <span v-for="name in item.Address">
                                    <span>{{name}}</span>
                                    <span>;</span>
                                </span>
                            </td>
                            <td>
                                <p style="height:28px;line-height:40px;">
                                    <span>{{item.Phone}}</span>
                                    <span>Phone</span>
                                </p>
                                <p style="height:28px;line-height:20px;">
                                    <span>{{item.Fax}}</span>
                                    <span>Fax</span>
                                </p>
                            </td>
                            <td style="padding-right:36px;" :title="item.Email">
                                {{item.Email}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="whois_page" :total-row="whoistotalRow" :page-size-menu='false' @page-change="whoispageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="dns" v-if="item_type.DNS">
                <div class="dns_top ">
                    <span class="dns_top_name">DNS Resolutions for IP Address</span>
                    <!-- <img class="dns_top_img" src="../common/image/ip/info.png" alt=""> -->
                    <!-- <span class="dns_top_right">
                        <img class="dns_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="dns_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="dns_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 100px;">Hits(≈)</th>
                            <th style="width: 300px;">Domain</th>
                            <th>First Resolved</th>
                            <th>Last Resolved</th>
                            <th>Peak Date</th>
                            <th style="padding-right:36px;">Daily Peak(≈)</th>
                        </tr>
                        <tr v-for="item in DNSpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.HitsCount">{{item.HitsCount}}</td>
                            <td style="width: 300px;" :title="item.Domain">{{item.Domain}}</td>
                            <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
                            <td :title="item.LastSeen">{{item.LastSeen}}</td>
                            <td :title="item.PeakDate">{{item.PeakDate}}</td>
                            <td style="padding-right:36px;" :title="item.DailyPeak">{{item.DailyPeak}}</td>
                        </tr>
                    </table>
                    <v-page class="dns_page" :total-row="DNStotalRow" :page-size-menu='false' @page-change="DNSpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="files" v-if="item_type.Files">
                <div class="files_top ">
                    <span class="files_top_name">Files related to IP address</span>
                    <!-- <img class="files_top_img" src="../common/image/ip/info.png" alt=""> -->
                    <!-- <span class="files_top_right">
                        <img class="files_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="files_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="files_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 100px;">Hits(≈)</th>
                            <th style="width: 300px;">Files MD5</th>
                            <th>Detection name</th>
                            <th>URL</th>
                            <th>Last seen</th>
                            <th style="padding-right:36px;">First seen</th>
                        </tr>
                        <tr v-for="item in filespageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.DownloadHitsCount">{{item.DownloadHitsCount}}</td>
                            <td style="width: 300px;" :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.DetectionName">{{item.DetectionName}}</td>
                            <td :title="item.Url">{{item.Url}}</td>
                            <td :title="item.LastSeen">{{item.LastSeen}}</td>
                            <td style="padding-right:36px;" :title="item.FirstSeen">{{item.FirstSeen}}</td>
                        </tr>
                    </table>
                    <v-page class="files_page" :total-row="filestotalRow" :page-size-menu='false' @page-change="filespageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="host" v-if="item_type.Hosted">
                <div class="host_top ">
                    <span class="host_top_name">Hosted URLs</span>
                    <!-- <img class="host_top_img" src="../common/image/ip/info.png" alt=""> -->
                    <!-- <span class="host_top_right">
                        <img class="host_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="host_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="host_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 100px;">Hits(≈)</th>
                            <th style="width: 600px;">URL</th>
                            <th>First seen</th>
                            <th style="padding-right:36px;">Last seen</th>
                        </tr>
                        <tr v-for="item in hostpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.UrlHitsCount">{{item.UrlHitsCount}}</td>
                            <td :title="item.Url">{{item.Url}}</td>
                            <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
                            <td style="padding-right:36px;" :title="item.LastSeen">{{item.LastSeen}}</td>
                        </tr>
                    </table>
                    <v-page class="host_page" :total-row="hosttotalRow" :page-size-menu='false' @page-change="hostpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
        </div>
    </div>
</template>
<style  lang="less">
.ip {
  color: #333;
  text-align: left;
  padding-bottom: 50px;
  .Zone_img {
    vertical-align: middle;
  }
  .Zone_name {
    vertical-align: middle;
  }
  .red {
    color: #ff5f5c;
  }
  .yellow {
    color: #feaa00;
  }
  .grey {
    color: #bbbbbb;
  }
  .green {
    color: #7ace4c;
  }
  .title {
    height: 64px;
    background: #ffffff;
    box-shadow: 0 2px 4px 0 #ececec;
    padding: 0 48px;
    line-height: 64px;
    font-size: 20px;
    font-weight: 600;
  }
  .container {
    padding: 0 48px;
    .report {
      margin-top: 36px;
      background: #ffffff;
      border-radius: 6px;
      height: 298px;
      .report_top {
        height: 84px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        .report_top_title_box {
          margin-top: 20px;
          height: 22px;
          font-size: 16px;
          line-height: 22px;
          .report_top_title_box_left {
            float: left;
            .report_top_title {
              color: #333333;
              font-weight: 600;
            }
            .report_top_name {
              //   color: #999999;
              line-height: 22px;
            }
          }
          .report_top_title_box_right {
            float: right;
            .report_top_title_box_right_img {
              margin: 0 5px 0 36px;
              vertical-align: middle;
            }
            .report_top_title_box_right_span {
              vertical-align: middle;
              font-size: 14px;
              color: #0070ff;
            }
          }
        }
        .report_top_bom {
          margin-top: 8px;
          font-size: 14px;
          color: #0070ff;
        }
      }
      .report_mid {
        height: 158px;
        .report_mid_item {
          height: 158px;
          .report_mid_item_col {
            padding-left: 36px;
            height: 158px;
            .report_mid_item_col_name {
              font-size: 12px;
              color: #999999;
              margin-top: 24px;
            }
            .report_mid_item_col_value {
              font-size: 14px;
              margin-top: 6px;
              color: #333333;
              height: 20px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
      .report_bom {
        background: #eef6ff;
        border-radius: 0 0 6px 6px;
        padding: 0 36px;
        line-height: 56px;
        .report_bom_box {
          display: inline-block;
          .report_bom_img {
            vertical-align: middle;
            margin-left: 15px;
          }
          .report_bom_span {
            margin-left: -20px;
            display: inline-block;
            padding: 0 10px;
            height: 26px;
            font-size: 12px;
            color: #ffffff;
            background: #0070ff;
            line-height: 26px;
          }
        }
      }
    }
    .whois {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .whois_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .whois_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .whois_top_img {
          vertical-align: middle;
        }
      }
      .whois_mid {
        height: 158px;
        border-bottom: 1px solid #ececec;
        .whois_mid_item {
          height: 158px;
          .whois_mid_item_col {
            padding-left: 36px;
            height: 158px;
            .whois_mid_item_col_name {
              height: 17px;
              font-size: 12px;
              color: #999999;
              margin-top: 24px;
            }
            .whois_mid_item_col_value {
              height: 20px;
              font-size: 14px;
              margin-top: 6px;
              color: #333333;
            }
          }
        }
      }
      .whois_bom {
        .whois_page {
          padding: 26px;
          ul {
            li {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .dns {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .dns_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .dns_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .dns_top_img {
          vertical-align: middle;
        }
        .dns_top_right {
          float: right;
          .dns_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .dns_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .dns_bom {
        .dns_page {
          padding: 26px;
          ul {
            li {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .files {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .files_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .files_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .files_top_img {
          vertical-align: middle;
        }
        .files_top_right {
          float: right;
          .files_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .files_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .files_bom {
        .files_page {
          padding: 26px;
          ul {
            li {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .host {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .host_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .host_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .host_top_img {
          vertical-align: middle;
        }
        .host_top_right {
          float: right;
          .host_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .host_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .host_bom {
        .host_page {
          padding: 26px;
          ul {
            li {
              margin: 0 5px;
            }
          }
        }
      }
    }
  }
}
</style>
<script>
export default {
  name: "ip",
  data() {
    return {
      ip_data: "",
      indicator: "",
      whoistotalRow: 100,
      whoispageArr: [],
      DNStotalRow: 100,
      DNSpageArr: [],
      filestotalRow: 100,
      filespageArr: [],
      hosttotalRow: 100,
      hostpageArr: [],
      item_type: {
        WHOIS: false,
        DNS: false,
        Files: false,
        Hosted: false
      }
    };
  },
  created() {
    // console.log(this.$route.query.name);
    this.indicator = this.$route.query.name;
  },
  mounted() {
    // console.log(this.$route.query.name);
    this.intelligence();
  },
  methods: {
    intelligence() {
      this.$axios
        // .get("https://47.105.196.251:8443/intelligence/extension", {
        .get("/intelligence/extension", {
          params: {
            indicator: this.$route.query.name
            // indicator: "1.10.204.200"
          }
        })
        //     .get("/intelligence/extension")
        .then(response => {
          if (response.data.status == "success") {
            switch (response.data.data.result.Zone) {
              case "Red":
                response.data.data.result.Zone_hoohoolab = "Dangerous";
                break;
              case "Orange":
                response.data.data.result.Zone_hoohoolab = "Suspicious";
                break;
              case "Grey":
                response.data.data.result.Zone_hoohoolab = "Not categorized";
                break;
              case "Green":
                response.data.data.result.Zone_hoohoolab = "Good";
                break;
              default:
                break;
            }
            if (response.data.data.result.IpWhoIs.Contacts) {
              this.whoistotalRow =
                response.data.data.result.IpWhoIs.Contacts.length;
              this.item_type.WHOIS = true;
            } else {
              this.whoistotalRow = 0;
            }
            if (response.data.data.result.IpDnsResolutions) {
              response.data.data.result.IpDnsResolutions.forEach(item => {
                switch (item.Zone) {
                  case "Red":
                    item.Zone_hoohoolab = "Dangerous";
                    break;
                  case "Orange":
                    item.Zone_hoohoolab = "";
                    break;
                  case "Grey":
                    item.Zone_hoohoolab = "Not categorized";
                    break;
                  case "Yellow":
                    item.Zone_hoohoolab = "Adware and other";
                    break;
                  case "Green":
                    item.Zone_hoohoolab = "Good";
                    break;
                  default:
                    break;
                }
              });
              this.DNStotalRow =
                response.data.data.result.IpDnsResolutions.length;
              this.item_type.DNS = true;
            } else {
              this.DNStotalRow = 0;
            }
            if (response.data.data.result.FilesDownloadedFromIp) {
              response.data.data.result.FilesDownloadedFromIp.forEach(item => {
                switch (item.Zone) {
                  case "Red":
                    item.Zone_hoohoolab = "Malware";
                    break;
                  case "Orange":
                    item.Zone_hoohoolab = "";
                    break;
                  case "Grey":
                    item.Zone_hoohoolab = "Not categorized";
                    break;
                  case "Yellow":
                    item.Zone_hoohoolab = "Adware and other";
                    break;
                  case "Green":
                    item.Zone_hoohoolab = "Good";
                    break;
                  default:
                    break;
                }
              });
              this.filestotalRow =
                response.data.data.result.FilesDownloadedFromIp.length;
              this.item_type.Files = true;
            } else {
              this.filestotalRow = 0;
            }
            if (response.data.data.result.HostedUrls) {
              response.data.data.result.HostedUrls.forEach(item => {
                switch (item.Zone) {
                  case "Red":
                    item.Zone_hoohoolab = "Dangerous";
                    break;
                  case "Grey":
                    item.Zone_hoohoolab = "Not categorized";
                    break;
                  case "Yellow":
                    item.Zone_hoohoolab = "Adware and other";
                    break;
                  case "Green":
                    item.Zone_hoohoolab = "Clean";
                    break;
                  default:
                    break;
                }
              });
              this.hosttotalRow = response.data.data.result.HostedUrls.length;
              this.item_type.Hosted = true;
            } else {
              this.hosttotalRow = 0;
            }
            this.ip_data = response.data.data.result;
            if (this.ip_data.IpWhoIs.Asn != null && this.ip_data.IpWhoIs.Asn) {
              this.ip_data.IpWhoIs.Asn.forEach(item => {
                if (item.Description == null) {
                  item.Description_cn = "";
                } else {
                  item.Description_cn = item.Description[0];
                }
              });
            } else {
              this.ip_data.IpWhoIs.Asn = [{ Description_cn: "", Number: "" }];
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    whoispageChange(pInfo) {
      if (this.ip_data.IpWhoIs) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.ip_data.IpWhoIs.Contacts.length) {
          end = this.ip_data.IpWhoIs.Contacts.length;
        }
        this.whoispageArr.splice(0, this.whoispageArr.length);
        for (let i = start; i < end; i++) {
          this.whoispageArr.push(this.ip_data.IpWhoIs.Contacts[i]);
        }
      }
    },
    DNSpageChange(pInfo) {
      if (this.ip_data.IpDnsResolutions) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.ip_data.IpDnsResolutions.length) {
          end = this.ip_data.IpDnsResolutions.length;
        }
        this.DNSpageArr.splice(0, this.DNSpageArr.length);
        for (let i = start; i < end; i++) {
          this.DNSpageArr.push(this.ip_data.IpDnsResolutions[i]);
        }
      }
    },
    filespageChange(pInfo) {
      if (this.ip_data.FilesDownloadedFromIp) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.ip_data.FilesDownloadedFromIp.length) {
          end = this.ip_data.FilesDownloadedFromIp.length;
        }
        this.filespageArr.splice(0, this.filespageArr.length);
        for (let i = start; i < end; i++) {
          this.filespageArr.push(this.ip_data.FilesDownloadedFromIp[i]);
        }
      }
    },
    hostpageChange(pInfo) {
      if (this.ip_data.HostedUrls) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.ip_data.HostedUrls.length) {
          end = this.ip_data.HostedUrls.length;
        }
        this.hostpageArr.splice(0, this.hostpageArr.length);
        for (let i = start; i < end; i++) {
          this.hostpageArr.push(this.ip_data.HostedUrls[i]);
        }
      }
    }
  }
};
</script>


