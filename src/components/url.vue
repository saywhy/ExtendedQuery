<template>
    <div class="url" v-loading.fullscreen.lock="loading" v-cloak>
        <div class="title">URL查询</div>
        <div class="container">
            <div class="report clearfix">
                <div class="report_top clearfix">
                    <div class="report_top_title_box">
                        <div class="report_top_title_box_left">
                            <span class="report_top_title">Report for URL: </span>
                            <span class="report_top_name" :class="{red:url_data.Zone=='Red',yellow:url_data.Zone=='Yellow',grey:url_data.Zone=='Grey',green:url_data.Zone=='Green'}">{{url_data.Zone_hoohoolab}}</span>
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
                            <p class="report_mid_item_col_name">IPV4 Count</p>
                            <p class="report_mid_item_col_value">{{url_data.UrlGeneralInfo.Ipv4Count}}</p>
                            <p class="report_mid_item_col_name">Domain</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.whois">
                                    {{url_data.UrlDomainWhoIs.DomainName}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Files Count</p>
                            <p class="report_mid_item_col_value">{{url_data.UrlGeneralInfo.FilesCount}}</p>
                            <p class="report_mid_item_col_name">Registration organization</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.whois">
                                    {{url_data.UrlDomainWhoIs.Contacts[0].Organization}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Create</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.whois">
                                    {{url_data.UrlDomainWhoIs.Created}}
                                </span>
                            </p>
                            <p class="report_mid_item_col_name">Registrar Name</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.whois">
                                    {{url_data.UrlDomainWhoIs.Registrar.Info}}
                                </span>
                            </p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Expires</p>
                            <p class="report_mid_item_col_value">
                                <span v-if="item_type.whois">
                                    {{url_data.UrlDomainWhoIs.Expires}}
                                </span>
                            </p>
                        </el-col>
                    </el-row>
                </div>
                <div class="report_bom">
                    <span>Categories:</span>
                    <span v-for="item in url_data.UrlGeneralInfo.Categories">
                        <img class="report_bom_img" src="../common/image/ip/span.png" alt="">
                        <span class="report_bom_span">{{item}}</span>
                    </span>
                </div>
            </div>
            <div class="whois clearfix" v-if="item_type.whois">
                <div class="whois_top ">
                    <span class="whois_top_name">WHOIS</span>
                    <!-- <img class="whois_top_img" src="../common/image/ip/info.png" alt=""> -->
                </div>
                <div class="whois_mid ">
                    <el-row class="whois_mid_item">
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Domain Name</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.DomainName}}</p>
                            <p class="whois_mid_item_col_name">Paid Until</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Expires}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Domain Status</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.DomainStatus[0]}}</p>
                            <p class="whois_mid_item_col_name">Registrar Ifro</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Registrar.Info}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Created</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Created}}</p>
                            <p class="whois_mid_item_col_name">IANA ID</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Registrar.IanaId}}</p>
                        </el-col>
                        <el-col :span="6" class="whois_mid_item_col">
                            <p class="whois_mid_item_col_name">Updated</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Updated}}</p>
                            <p class="whois_mid_item_col_name">Email</p>
                            <p class="whois_mid_item_col_value">{{url_data.UrlDomainWhoIs.Registrar.Email}}</p>
                        </el-col>
                    </el-row>
                </div>
                <div class="whois_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Contracts</th>
                            <th>Name</th>
                            <th>Organization</th>
                            <th>Address</th>
                            <th>Phone/Fax</th>
                            <th style="padding-right:36px;">Email</th>
                        </tr>
                        <tr v-for="item in whoispageArr">
                            <td style="padding-left:36px;" :title="item.ContactType">{{item.ContactType}}</td>
                            <td :title="item.Name">{{item.Name?item.Name:'-'}}</td>
                            <td :title="item.Organization"> {{item.Organization?item.Organization:'-'}}</td>
                            <td>
                                <span>{{item.CountryCode}}</span>
                                <span>;</span>
                                <span>{{item.State}}</span>
                            </td>
                            <td>
                                <p style="height:28px;line-height:40px;">
                                    <span>{{item.Phone?item.Phone:'-'}}</span>
                                    <span>Phone</span>
                                </p>
                                <p style="height:28px;line-height:20px;">
                                    <span>{{item.Fax?item.Fax:'-'}}</span>
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
            <div class="dns" v-if="item_type.dns">
                <div class="dns_top ">
                    <span class="dns_top_name">DNS Resolutions for Domain</span>
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
                            <th style="width: 100px;">Threat Score</th>
                            <th style="width: 100px;">Hits(≈)</th>
                            <th>IP</th>
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
                            <td :title="item.ThreatScore">{{item.ThreatScore}}</td>
                            <td :title="item.HitsCount">{{item.HitsCount}}</td>
                            <td :title="item.Ip">{{item.Ip}}</td>
                            <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
                            <td :title="item.LastSeen">{{item.LastSeen}}</td>
                            <td :title="item.PeakDate">{{item.PeakDate}}</td>
                            <td style="padding-right:36px;" :title="item.DailyPeak">{{item.DailyPeak}}</td>
                        </tr>
                    </table>
                    <v-page class="dns_page" :total-row="DNStotalRow" :page-size-menu='false' @page-change="DNSpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="files" v-if="item_type.files">
                <div class="files_top ">
                    <span class="files_top_name">Files Download form requested URL</span>
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
                            <th>First Download</th>
                            <th>Last Download</th>
                            <th style="padding-right:36px;">Detection name</th>
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
                            <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
                            <td :title="item.LastSeen">{{item.LastSeen}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">{{item.DetectionName}}</td>
                        </tr>
                    </table>
                    <v-page class="files_page" :total-row="filestotalRow" :page-size-menu='false' @page-change="filespageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="requested" v-if="item_type.requested">
                <div class="requested_top ">
                    <span class="requested_top_name">Files accessed requested URL</span>
                    <!-- <img class="requested_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="requested_top_right">
                        <img class="requested_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="requested_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="requested_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 100px;">Hits(≈)</th>
                            <th style="width: 300px;">Files MD5</th>
                            <th>First Accessed</th>
                            <th>Last Accessed</th>
                            <th style="padding-right:36px;">Detection name</th>
                        </tr>
                        <tr v-for="item in requestedpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.AccessHitsCount">{{item.AccessHitsCount}}</td>
                            <td style="width: 300px;" :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
                            <td :title="item.LastSeen">{{item.LastSeen}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">{{item.DetectionName}}</td>
                        </tr>
                    </table>
                    <v-page class="requested_page" :total-row="requestedtotalRow" :page-size-menu='false' @page-change="requestedpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <div class="url" v-if="item_type.url">
                <div class="url_top ">
                    <span class="url_top_name">URL Marks</span>
                    <!-- <img class="url_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="url_top_right">
                        <img class="url_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="url_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="url_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th>Type</th>
                            <th style="width: 600px;">Mask</th>
                            <th style="padding-right:36px;">Feeds</th>
                        </tr>
                        <tr v-for="item in urlpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.MaskType">{{item.MaskType}}</td>
                            <td :title="item.NormalizedMask">{{item.NormalizedMask}}</td>
                            <td style="padding-right:36px;" :title="item.FeedNames">{{item.FeedNames}}</td>
                        </tr>
                    </table>
                    <v-page class="url_page" :total-row="urltotalRow" :page-size-menu='false' @page-change="urlpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
        </div>
    </div>
</template>
<style  lang="less">
.url {
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
              height: 20px;
              color: #333333;
            }
          }
        }
      }
      .report_bom {
        height: 56px;
        background: #eef6ff;
        border-radius: 0 0 6px 6px;
        padding: 0 36px;
        line-height: 56px;
        .report_bom_img {
          vertical-align: middle;
          margin-left: 15px;
        }
        .report_bom_span {
          vertical-align: middle;
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
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
    .requested {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .requested_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .requested_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .requested_top_img {
          vertical-align: middle;
        }
        .requested_top_right {
          float: right;
          .requested_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .requested_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .requested_bom {
        .requested_page {
          padding: 26px;
          ul {
            li {
              margin: 0 5px;
            }
          }
        }
      }
    }
    .url {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .url_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .url_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
        }
        .url_top_img {
          vertical-align: middle;
        }
        .url_top_right {
          float: right;
          .url_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .url_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .url_bom {
        .url_page {
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
      url_data: "",
      indicator: "",
      whoistotalRow: 100,
      whoispageArr: [],
      DNStotalRow: 100,
      DNSpageArr: [],
      filestotalRow: 100,
      filespageArr: [],
      requestedtotalRow: 100,
      requestedpageArr: [],
      urltotalRow: 100,
      urlpageArr: [],
      item_type: {
        whois: false,
        dns: false,
        files: false,
        requested: false,
        url: false
      },
      loading: true
    };
  },
  created() {
    console.log(this.$route.query.name);
    this.indicator = this.$route.query.name;
    this.loading = true;
    this.intelligence();
  },
  mounted() {
    // console.log(this.$route.query.name);
  },
  methods: {
    intelligence() {
      this.$axios
        // .get("https://47.105.196.251/intelligence/extension", {
        .get("/intelligence/extension", {
          params: {
            indicator: this.$route.query.name
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            switch (response.data.data.result.Zone) {
              case "Red":
                response.data.data.result.Zone_hoohoolab = "Dangerous";
                break;
              case "Orange":
                response.data.data.result.Zone_hoohoolab = "";
                break;
              case "Yellow":
                response.data.data.result.Zone_hoohoolab = "Adware and other";
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
            if (response.data.data.result.UrlDomainWhoIs) {
              this.whoistotalRow =
                response.data.data.result.UrlDomainWhoIs.Contacts.length;
              this.item_type.whois = true;
            } else {
              this.whoistotalRow = 0;
            }
            if (response.data.data.result.DomainDnsResolutions) {
              response.data.data.result.DomainDnsResolutions.forEach(item => {
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
                response.data.data.result.DomainDnsResolutions.length;
              this.item_type.dns = true;
            } else {
              this.DNStotalRow = 0;
            }
            if (response.data.data.result.FilesDownloaded) {
              response.data.data.result.FilesDownloaded.forEach(item => {
                switch (item.Zone) {
                  case "Red":
                    item.Zone_hoohoolab = "Malware";
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
              this.filestotalRow =
                response.data.data.result.FilesDownloaded.length;
              this.item_type.files = true;
            } else {
              this.filestotalRow = 0;
            }
            if (response.data.data.result.FilesAccessed) {
              response.data.data.result.FilesAccessed.forEach(item => {
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
              this.requestedtotalRow =
                response.data.data.result.FilesAccessed.length;
              this.item_type.requested = true;
            } else {
              this.requestedtotalRow = 0;
            }
            if (response.data.data.result.FeedMasks) {
              response.data.data.result.FeedMasks.forEach(item => {
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
              this.urltotalRow = response.data.data.result.FeedMasks.length;
              this.item_type.url = true;
            } else {
              this.urltotalRow = 0;
            }
            this.url_data = response.data.data.result;
            setTimeout(() => {
              this.loading = false;
            }, 4000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    whoispageChange(pInfo) {
      if (this.url_data.UrlDomainWhoIs) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.url_data.UrlDomainWhoIs.Contacts.length) {
          end = this.url_data.UrlDomainWhoIs.Contacts.length;
        }
        this.whoispageArr.splice(0, this.whoispageArr.length);
        for (let i = start; i < end; i++) {
          this.whoispageArr.push(this.url_data.UrlDomainWhoIs.Contacts[i]);
        }
      }
    },
    DNSpageChange(pInfo) {
      if (this.url_data.DomainDnsResolutions) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.url_data.DomainDnsResolutions.length) {
          end = this.url_data.DomainDnsResolutions.length;
        }
        this.DNSpageArr.splice(0, this.DNSpageArr.length);
        for (let i = start; i < end; i++) {
          this.DNSpageArr.push(this.url_data.DomainDnsResolutions[i]);
        }
      }
    },
    filespageChange(pInfo) {
      if (this.url_data.FilesDownloaded) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.url_data.FilesDownloaded.length) {
          end = this.url_data.FilesDownloaded.length;
        }
        this.filespageArr.splice(0, this.filespageArr.length);
        for (let i = start; i < end; i++) {
          this.filespageArr.push(this.url_data.FilesDownloaded[i]);
        }
      }
    },
    requestedpageChange(pInfo) {
      if (this.url_data.FilesAccessed) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.url_data.FilesAccessed.length) {
          end = this.url_data.FilesAccessed.length;
        }
        this.requestedpageArr.splice(0, this.requestedpageArr.length);
        for (let i = start; i < end; i++) {
          this.requestedpageArr.push(this.url_data.FilesAccessed[i]);
        }
      }
    },
    urlpageChange(pInfo) {
      if (this.url_data.FeedMasks) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.url_data.FeedMasks.length) {
          end = this.url_data.FeedMasks.length;
        }
        this.urlpageArr.splice(0, this.urlpageArr.length);
        for (let i = start; i < end; i++) {
          this.urlpageArr.push(this.url_data.FeedMasks[i]);
        }
      }
    }
  }
};
</script>


