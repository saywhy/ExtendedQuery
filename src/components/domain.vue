<template >
  <div class="domain"
       v-loading.fullscreen.lock="loading"
       v-cloak>
    <div class="title">
      域名查询
      <span class="data_source"
            v-if="ip_data_all.source=='offline'">
        <span>数据来自本地缓存</span>
      </span>
      <span class="info_img"
            v-if="ip_data_all.source=='offline'">
        <el-tooltip class="item"
                    effect="dark"
                    :content="ip_data_all.addtime*1000 | datefrm"
                    placement="bottom">
          <img src="../common/image/ip/info.png"
               alt="">
        </el-tooltip>
      </span>
      <button v-if="ip_data_all.source=='offline'"
              class="btn_now"
              @click="refresh">立即刷新</button>
    </div>
    <div class="container">
      <!-- Report for Domain:  -->
      <div class="report clearfix">
        <div class="report_top clearfix">
          <div class="report_top_title_box">
            <div class="report_top_title_box_left">
              <span class="report_top_title">Report for Domain: </span>
              <span class="report_top_name"
                    :class="{red:domain_data.Zone=='Red',yellow:domain_data.Zone=='Yellow',grey:domain_data.Zone=='Grey',green:domain_data.Zone=='Green'}">{{domain_data.Zone_hoohoolab}}</span>
            </div>
            <!-- <div class="report_top_title_box_right">
                            <img class="report_top_title_box_right_img" src="../common/image/ip/a.png" alt="">
                            <span class="report_top_title_box_right_span">Copy Request</span>
                            <img class="report_top_title_box_right_img" src="../common/image/ip/down.png" alt="">
                            <span class="report_top_title_box_right_span">Export all results</span>
                        </div> -->
          </div>
          <div class="report_top_bom">
            <img src=""
                 alt="">
            <span>{{indicator}}</span>
          </div>
        </div>
        <div class="report_mid">
          <el-row class="report_mid_item">
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">IPV4 Count</p>
              <p class="report_mid_item_col_value"
                 :title="domain_data.DomainGeneralInfo.Ipv4Count">{{domain_data.DomainGeneralInfo.Ipv4Count}}</p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Files Count</p>
              <p class="report_mid_item_col_value"
                 :title="domain_data.DomainGeneralInfo.FilesCount">{{domain_data.DomainGeneralInfo.FilesCount}}</p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">URLs count</p>
              <p class="report_mid_item_col_value"
                 :title="domain_data.DomainGeneralInfo.UrlsCount">{{domain_data.DomainGeneralInfo.UrlsCount}}</p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Registration organization</p>
              <p class="report_mid_item_col_value">
                <span v-if="item_type.whois"
                      :title="domain_data.DomainWhoIsInfo.RegistrationOrganization">
                  {{domain_data.DomainWhoIsInfo.RegistrationOrganization}}
                </span>
              </p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Created</p>
              <p class="report_mid_item_col_value">
                <span v-if="item_type.whois"
                      :title="domain_data.DomainWhoIsInfo.Created">
                  {{domain_data.DomainWhoIsInfo.Created}}
                </span>
              </p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Expires</p>
              <p class="report_mid_item_col_value">
                <span v-if="item_type.whois"
                      :title="domain_data.DomainWhoIsInfo.Expires">
                  {{domain_data.DomainWhoIsInfo.Expires}}
                </span>
              </p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Domain</p>
              <p class="report_mid_item_col_value">
                <span v-if="item_type.whois"
                      :title="domain_data.DomainWhoIsInfo.DomainName">
                  {{domain_data.DomainWhoIsInfo.DomainName}}
                </span>
              </p>
            </el-col>
            <el-col :span="6"
                    class="report_mid_item_col">
              <p class="report_mid_item_col_name">Registrar name</p>
              <p class="report_mid_item_col_value">
                <span v-if="item_type.whois"
                      :title="domain_data.DomainWhoIsInfo.Registrar.Info">
                  {{domain_data.DomainWhoIsInfo.Registrar.Info}}
                </span>
              </p>
            </el-col>
          </el-row>
        </div>
        <div class="report_bom">
          <span>Categories:</span>
          <span v-for="item in domain_data.DomainGeneralInfo.Categories"
                class="report_bom_box">
            <img class="report_bom_img"
                 src="../common/image/ip/span.png"
                 alt="">
            <span class="report_bom_span">{{item}}</span>
          </span>
        </div>
      </div>
      <!-- WHOIS -->
      <div class="whois clearfix"
           v-if="item_type.whois">
        <div class="whois_top ">
          <span class="whois_top_name">WHOIS</span>
          <!-- <img class="whois_top_img" src="../common/image/ip/info.png" alt=""> -->
        </div>
        <div class="whois_mid ">
          <el-row class="whois_mid_item">
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Domain Name</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.DomainName">{{domain_data.DomainWhoIsInfo.DomainName}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Domain Status</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.DomainStatus_cn">{{domain_data.DomainWhoIsInfo.DomainStatus_cn}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Created</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Created">{{domain_data.DomainWhoIsInfo.Created}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Updated</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Updated">{{domain_data.DomainWhoIsInfo.Updated}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Paid Until</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Expires">{{domain_data.DomainWhoIsInfo.Expires}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Registrar Ifro</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Registrar.Info">{{domain_data.DomainWhoIsInfo.Registrar.Info}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">IANA ID</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Registrar.IanaId">{{domain_data.DomainWhoIsInfo.Registrar.IanaId}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Email</p>
              <p class="whois_mid_item_col_value"
                 :title="domain_data.DomainWhoIsInfo.Registrar.Email">{{domain_data.DomainWhoIsInfo.Registrar.Email}}</p>
            </el-col>
            <el-col :span="6"
                    class="whois_mid_item_col">
              <p class="whois_mid_item_col_name">Name Servers</p>
              <p class="whois_mid_item_col_value"
                 v-for="item in domain_data.DomainWhoIsInfo.NameServers">
                <span>{{item}}</span>
              </p>
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
              <td style="padding-left:36px;"
                  :title="item.ContactType">{{item.ContactType}}</td>
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
              <td style="padding-right:36px;"
                  :title="item.Email">
                {{item.Email}}
              </td>
            </tr>
          </table>
          <v-page class="whois_page"
                  :total-row="whoistotalRow"
                  :page-size-menu='false'
                  @page-change="whoispageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
      <!-- DNS Resolutions for Domain -->
      <div class="dns"
           v-if="item_type.dns">
        <div class="dns_top ">
          <span class="dns_top_name">DNS Resolutions for Domain</span>
          <!-- <img class="dns_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="dns_top_right">
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
              <td style="padding-left:36px;"
                  :title="item.Zone_hoohoolab">
                <img class="Zone_img"
                     src="../common/image/ip/red.png"
                     alt=""
                     v-if="item.Zone=='Red'">
                <img class="Zone_img"
                     src="../common/image/ip/yellow.png"
                     v-if="item.Zone=='Yellow'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/green.png"
                     v-if="item.Zone=='Green'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/grey.png"
                     v-if="item.Zone=='Grey'"
                     alt="">
                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}"
                      class="Zone_name">
                  {{item.Zone_hoohoolab}}
                </span>
              </td>
              <td :title="item.ThreatScore">{{item.ThreatScore}}</td>
              <td :title="item.HitsCount">{{item.HitsCount}}</td>
              <td :title="item.Ip">{{item.Ip}}</td>
              <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
              <td :title="item.LastSeen">{{item.LastSeen}}</td>
              <td :title="item.PeakDate">{{item.PeakDate}}</td>
              <td style="padding-right:36px;"
                  :title="item.DailyPeak">{{item.DailyPeak}}</td>
            </tr>
          </table>
          <v-page class="dns_page"
                  :total-row="DNStotalRow"
                  :page-size-menu='false'
                  @page-change="DNSpageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
      <!-- Files Downloaded from requested domain -->
      <div class="files"
           v-if="item_type.files">
        <div class="files_top ">
          <span class="files_top_name">Files Downloaded from requested domain</span>
          <!-- <img class="files_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="files_top_right">
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
              <td style="padding-left:36px;"
                  :title="item.Zone_hoohoolab">
                <img class="Zone_img"
                     src="../common/image/ip/red.png"
                     alt=""
                     v-if="item.Zone=='Red'">
                <img class="Zone_img"
                     src="../common/image/ip/yellow.png"
                     v-if="item.Zone=='Yellow'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/green.png"
                     v-if="item.Zone=='Green'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/grey.png"
                     v-if="item.Zone=='Grey'"
                     alt="">
                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}"
                      class="Zone_name">
                  {{item.Zone_hoohoolab}}
                </span>
              </td>
              <td :title="item.DownloadHitsCount">{{item.DownloadHitsCount}}</td>
              <td style="width: 300px;"
                  :title="item.Md5">{{item.Md5}}</td>
              <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
              <td :title="item.LastSeen">{{item.LastSeen}}</td>
              <td style="padding-right:36px;"
                  :title="item.DetectionName">{{item.DetectionName}}</td>
            </tr>
          </table>
          <v-page class="files_page"
                  :total-row="filestotalRow"
                  :page-size-menu='false'
                  @page-change="filespageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
      <!-- Files accessed requested domain -->
      <div class="requested"
           v-if="item_type.requested">
        <div class="requested_top ">
          <span class="requested_top_name">Files accessed requested domain </span>
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
              <td style="padding-left:36px;"
                  :title="item.Zone_hoohoolab">
                <img class="Zone_img"
                     src="../common/image/ip/red.png"
                     alt=""
                     v-if="item.Zone=='Red'">
                <img class="Zone_img"
                     src="../common/image/ip/yellow.png"
                     v-if="item.Zone=='Yellow'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/green.png"
                     v-if="item.Zone=='Green'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/grey.png"
                     v-if="item.Zone=='Grey'"
                     alt="">
                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}"
                      class="Zone_name">
                  {{item.Zone_hoohoolab}}
                </span>
              </td>
              <td :title="item.AccessHitsCount">{{item.AccessHitsCount}}</td>
              <td style="width: 300px;"
                  :title="item.Md5">{{item.Md5}}</td>
              <td :title="item.FirstSeen">{{item.FirstSeen}}</td>
              <td :title="item.LastSeen">{{item.LastSeen}}</td>
              <td style="padding-right:36px;"
                  :title="item.DetectionName">{{item.DetectionName}}</td>
            </tr>
          </table>
          <v-page class="requested_page"
                  :total-row="requestedtotalRow"
                  :page-size-menu='false'
                  @page-change="requestedpageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
      <!-- Referrals to domain -->
      <div class="requested"
           v-if="item_type.Referrals">
        <div class="requested_top ">
          <span class="requested_top_name">Referrals to domain </span>
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
              <th style="width:800px">URL</th>
              <th style="padding-right:36px;">Last Reference</th>
            </tr>
            <tr v-for="item in referralspageArr">
              <td style="padding-left:36px;"
                  :title="item.Zone_hoohoolab">
                <img class="Zone_img"
                     src="../common/image/ip/red.png"
                     alt=""
                     v-if="item.Zone=='Red'">
                <img class="Zone_img"
                     src="../common/image/ip/yellow.png"
                     v-if="item.Zone=='Yellow'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/green.png"
                     v-if="item.Zone=='Green'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/grey.png"
                     v-if="item.Zone=='Grey'"
                     alt="">
                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}"
                      class="Zone_name">
                  {{item.Zone_hoohoolab}}
                </span>
              </td>
              <td :title="item.Url">{{item.Url}}</td>
              <td style="padding-right:36px;"
                  :title="item.LastSeen">{{item.LastSeen}}</td>
            </tr>
          </table>
          <v-page class="requested_page"
                  :total-row="referralstotalRow"
                  :page-size-menu='false'
                  @page-change="referralspageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
      <!-- URL Marks -->
      <div class="requested"
           v-if="item_type.Marks">
        <div class="requested_top ">
          <span class="requested_top_name">URL Marks </span>
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
              <th>Type</th>
              <th>Mask</th>
              <th style="padding-right:36px;">Feeds</th>
            </tr>
            <tr v-for="item in markspageArr">
              <td style="padding-left:36px;"
                  :title="item.Zone_hoohoolab">
                <img class="Zone_img"
                     src="../common/image/ip/red.png"
                     alt=""
                     v-if="item.Zone=='Red'">
                <img class="Zone_img"
                     src="../common/image/ip/yellow.png"
                     v-if="item.Zone=='Yellow'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/green.png"
                     v-if="item.Zone=='Green'"
                     alt="">
                <img class="Zone_img"
                     src="../common/image/ip/grey.png"
                     v-if="item.Zone=='Grey'"
                     alt="">
                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}"
                      class="Zone_name">
                  {{item.Zone_hoohoolab}}
                </span>
              </td>
              <td :title="item.MaskType">{{item.MaskType}}</td>
              <td :title="item.NormalizedMask">{{item.NormalizedMask}}</td>
              <td style="padding-right:36px;"
                  :title="item.FeedNames_cn">{{item.FeedNames_cn}}</td>
            </tr>
          </table>
          <v-page class="requested_page"
                  :total-row="markstotalRow"
                  :page-size-menu='false'
                  @page-change="markspageChange"
                  :border="false"
                  align="center"></v-page>
        </div>
      </div>
    </div>
  </div>
</template>
<style  lang="less">
.domain {
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
    position: relative;
    .data_source {
      font-size: 14px;
      position: absolute;
      right: 200px;
      top: 50%;
      transform: translateY(-50%);
    }
    .info_img {
      position: absolute;
      right: 150px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
    .btn_now {
      cursor: pointer;
      position: absolute;
      right: 48px;
      top: 50%;
      transform: translateY(-50%);
      background: #0070ff;
      font-size: 14px;
      color: #fff;
      width: 80px;
      border-radius: 4px;
      height: 32px;
    }
  }
  .container {
    padding: 0 48px;
    .report {
      margin-top: 36px;
      background: #ffffff;
      border-radius: 6px;
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
              vertical-align: middle;
            }
            .report_top_name {
              //   color: #999999;
              line-height: 22px;
            }
            .report_top_img {
              vertical-align: sub;
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
        padding-bottom: 15px;
        .report_mid_item {
          .report_mid_item_col {
            padding-left: 36px;
            padding-top: 24px;
            height: 68px;
            .report_mid_item_col_name {
              font-size: 12px;
              color: #999999;
            }
            .report_mid_item_col_value {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 14px;
              margin-top: 6px;
              color: #333333;
            }
          }
        }
      }
      .report_bom {
        // height: 56px;
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
        border-bottom: 1px solid #ececec;
        padding-bottom: 15px;
        .whois_mid_item {
          .whois_mid_item_col {
            padding-left: 36px;
            padding-top: 24px;
            min-height: 68px;
            .whois_mid_item_col_name {
              font-size: 12px;
              color: #999999;
            }
            .whois_mid_item_col_value {
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
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
  }
}
</style>
<script>
import moment from "moment";
export default {
  name: "ip",
  data () {
    return {
      domain_data: {
        UrlGeneralInfo: {}
      },
      ip_data_all: "",
      indicator: "",
      whoistotalRow: 100,
      whoispageArr: [],
      DNStotalRow: 100,
      DNSpageArr: [],
      filestotalRow: 100,
      filespageArr: [],
      requestedtotalRow: 100,
      requestedpageArr: [],
      referralstotalRow: 100,
      referralspageArr: [],
      markstotalRow: 100,
      markspageArr: [],
      item_type: {
        whois: false,
        dns: false,
        files: false,
        requested: false,
        Referrals: false,
        Marks: false
      },
      loading: true
    };
  },
  created () {
    this.indicator = this.$route.query.name;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    this.ip_data_all = JSON.parse(sessionStorage.getItem("DomainGeneralInfo"));
    switch (this.ip_data_all.result.Zone) {
      case "Red":
        this.ip_data_all.result.Zone_hoohoolab = "Dangerous";
        break;
      case "Orange":
        this.ip_data_all.result.Zone_hoohoolab = "";
        break;
      case "Yellow":
        this.ip_data_all.result.Zone_hoohoolab = "Adware and other";
        break;
      case "Grey":
        this.ip_data_all.result.Zone_hoohoolab = "Not categorized";
        break;
      case "Green":
        this.ip_data_all.result.Zone_hoohoolab = "Good";
        break;
      default:
        break;
    }
    if (this.ip_data_all.result.DomainWhoIsInfo) {
      if (
        this.ip_data_all.result.DomainWhoIsInfo.Contacts != null &&
        this.ip_data_all.result.DomainWhoIsInfo.Contacts
      ) {
        this.whoistotalRow = this.ip_data_all.result.DomainWhoIsInfo.Contacts.length;
      } else {
        this.whoistotalRow = 0;
      }
      if (this.ip_data_all.result.DomainWhoIsInfo.DomainStatus) {
        this.ip_data_all.result.DomainWhoIsInfo.DomainStatus_cn = this.ip_data_all.result.DomainWhoIsInfo.DomainStatus[0];
      } else {
        this.ip_data_all.result.DomainWhoIsInfo.DomainStatus_cn = "";
      }
      this.item_type.whois = true;
    } else {
      this.whoistotalRow = 0;
    }
    if (this.ip_data_all.result.DomainDnsResolutions) {
      this.ip_data_all.result.DomainDnsResolutions.forEach(item => {
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
      this.DNStotalRow = this.ip_data_all.result.DomainDnsResolutions.length;
      this.item_type.dns = true;
    } else {
      this.DNStotalRow = 0;
    }
    if (this.ip_data_all.result.FilesDownloaded) {
      this.ip_data_all.result.FilesDownloaded.forEach(item => {
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
      this.filestotalRow = this.ip_data_all.result.FilesDownloaded.length;
      this.item_type.files = true;
    } else {
      this.filestotalRow = 0;
    }
    if (this.ip_data_all.result.FilesAccessed) {
      this.ip_data_all.result.FilesAccessed.forEach(item => {
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
            item.Zone_hoohoolab = "Good";
            break;
          default:
            break;
        }
      });
      this.requestedtotalRow = this.ip_data_all.result.FilesAccessed.length;
      this.item_type.requested = true;
    } else {
      this.requestedtotalRow = 0;
    }
    if (this.ip_data_all.result.UrlReferrals) {
      this.ip_data_all.result.UrlReferrals.forEach(item => {
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
            item.Zone_hoohoolab = "Good";
            break;
          default:
            break;
        }
      });
      this.referralstotalRow = this.ip_data_all.result.UrlReferrals.length;
      this.item_type.Referrals = true;
    } else {
      this.referralstotalRow = 0;
    }

    if (this.ip_data_all.result.FeedMasks) {
      this.ip_data_all.result.FeedMasks.forEach(item => {
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
            item.Zone_hoohoolab = "Good";
            break;
          default:
            break;
        }
        if (item.FeedNames) {
          item.FeedNames_cn = item.FeedNames[0];
        } else {
          item.FeedNames_cn = "";
        }
      });
      this.markstotalRow = this.ip_data_all.result.FeedMasks.length;
      this.item_type.Marks = true;
    } else {
      this.markstotalRow = 0;
    }
    this.domain_data = this.ip_data_all.result;
  },
  mounted () {
    console.log(this.$route.query.name);
  },
  filters: {
    datefrm: function (el) {
      return moment(el).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  methods: {
    whoispageChange (pInfo) {
      if (this.domain_data.DomainWhoIsInfo) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.DomainWhoIsInfo.Contacts.length) {
          end = this.domain_data.DomainWhoIsInfo.Contacts.length;
        }
        this.whoispageArr.splice(0, this.whoispageArr.length);
        for (let i = start; i < end; i++) {
          this.whoispageArr.push(this.domain_data.DomainWhoIsInfo.Contacts[i]);
        }
      }
      console.log(this.whoispageArr);
    },
    DNSpageChange (pInfo) {
      if (this.domain_data.DomainDnsResolutions) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.DomainDnsResolutions.length) {
          end = this.domain_data.DomainDnsResolutions.length;
        }
        this.DNSpageArr.splice(0, this.DNSpageArr.length);
        for (let i = start; i < end; i++) {
          this.DNSpageArr.push(this.domain_data.DomainDnsResolutions[i]);
        }
      }
    },
    filespageChange (pInfo) {
      if (this.domain_data.FilesDownloaded) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.FilesDownloaded.length) {
          end = this.domain_data.FilesDownloaded.length;
        }
        this.filespageArr.splice(0, this.filespageArr.length);
        for (let i = start; i < end; i++) {
          this.filespageArr.push(this.domain_data.FilesDownloaded[i]);
        }
      } else {
        this.filespageArr = [];
      }
    },
    requestedpageChange (pInfo) {
      if (this.domain_data.FilesAccessed) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.FilesAccessed.length) {
          end = this.domain_data.FilesAccessed.length;
        }
        this.requestedpageArr.splice(0, this.requestedpageArr.length);
        for (let i = start; i < end; i++) {
          this.requestedpageArr.push(this.domain_data.FilesAccessed[i]);
        }
      }
    },
    referralspageChange (pInfo) {
      if (this.domain_data.UrlReferrals) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.UrlReferrals.length) {
          end = this.domain_data.UrlReferrals.length;
        }
        this.referralspageArr.splice(0, this.referralspageArr.length);
        for (let i = start; i < end; i++) {
          this.referralspageArr.push(this.domain_data.UrlReferrals[i]);
        }
      }
    },
    markspageChange (pInfo) {
      if (this.domain_data.FeedMasks) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.domain_data.FeedMasks.length) {
          end = this.domain_data.FeedMasks.length;
        }
        this.markspageArr.splice(0, this.markspageArr.length);
        for (let i = start; i < end; i++) {
          this.markspageArr.push(this.domain_data.FeedMasks[i]);
        }
      }
    },
    refresh () {
      this.loading = true;
      this.$axios
        // .get("https://47.105.196.251:8443/intelligence/extension", {
        .get("/site/extension", {
          params: {
            reload: true,
            indicator: this.$route.query.name
          }
        })
        .then(response => {
          if (response.data.status == "success") {
            setTimeout(() => {
              this.loading = false;
            }, 1000);
            this.ip_data_all = response.data.data;
            switch (this.ip_data_all.result.Zone) {
              case "Red":
                this.ip_data_all.result.Zone_hoohoolab = "Dangerous";
                break;
              case "Orange":
                this.ip_data_all.result.Zone_hoohoolab = "";
                break;
              case "Yellow":
                this.ip_data_all.result.Zone_hoohoolab = "Adware and other";
                break;
              case "Grey":
                this.ip_data_all.result.Zone_hoohoolab = "Not categorized";
                break;
              case "Green":
                this.ip_data_all.result.Zone_hoohoolab = "Good";
                break;
              default:
                break;
            }
            if (this.ip_data_all.result.DomainWhoIsInfo) {
              if (
                this.ip_data_all.result.DomainWhoIsInfo.Contacts != null &&
                this.ip_data_all.result.DomainWhoIsInfo.Contacts
              ) {
                this.whoistotalRow = this.ip_data_all.result.DomainWhoIsInfo.Contacts.length;
              } else {
                this.whoistotalRow = 0;
              }
              if (this.ip_data_all.result.DomainWhoIsInfo.DomainStatus) {
                this.ip_data_all.result.DomainWhoIsInfo.DomainStatus_cn = this.ip_data_all.result.DomainWhoIsInfo.DomainStatus[0];
              } else {
                this.ip_data_all.result.DomainWhoIsInfo.DomainStatus_cn = "";
              }
              this.item_type.whois = true;
            } else {
              this.whoistotalRow = 0;
            }
            if (this.ip_data_all.result.DomainDnsResolutions) {
              this.ip_data_all.result.DomainDnsResolutions.forEach(item => {
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
              this.DNStotalRow = this.ip_data_all.result.DomainDnsResolutions.length;
              this.item_type.dns = true;
            } else {
              this.DNStotalRow = 0;
            }
            if (this.ip_data_all.result.FilesDownloaded) {
              this.ip_data_all.result.FilesDownloaded.forEach(item => {
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
              this.filestotalRow = this.ip_data_all.result.FilesDownloaded.length;
              this.item_type.files = true;
            } else {
              this.filestotalRow = 0;
            }
            if (this.ip_data_all.result.FilesAccessed) {
              this.ip_data_all.result.FilesAccessed.forEach(item => {
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
                    item.Zone_hoohoolab = "Good";
                    break;
                  default:
                    break;
                }
              });
              this.requestedtotalRow = this.ip_data_all.result.FilesAccessed.length;
              this.item_type.requested = true;
            } else {
              this.requestedtotalRow = 0;
            }
            if (this.ip_data_all.result.UrlReferrals) {
              this.ip_data_all.result.UrlReferrals.forEach(item => {
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
                    item.Zone_hoohoolab = "Good";
                    break;
                  default:
                    break;
                }
              });
              this.referralstotalRow = this.ip_data_all.result.UrlReferrals.length;
              this.item_type.Referrals = true;
            } else {
              this.referralstotalRow = 0;
            }

            if (this.ip_data_all.result.FeedMasks) {
              this.ip_data_all.result.FeedMasks.forEach(item => {
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
                    item.Zone_hoohoolab = "Good";
                    break;
                  default:
                    break;
                }
                if (item.FeedNames) {
                  item.FeedNames_cn = item.FeedNames[0];
                } else {
                  item.FeedNames_cn = "";
                }
              });
              this.markstotalRow = this.ip_data_all.result.FeedMasks.length;
              this.item_type.Marks = true;
            } else {
              this.markstotalRow = 0;
            }
            this.domain_data = this.ip_data_all.result;
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>


