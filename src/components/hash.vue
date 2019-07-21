<template>
    <div class="hash" v-loading.fullscreen.lock="loading" v-cloak>
        <div class="title">Hash查询</div>
        <div class="container">
            <!-- Hash report for MD5: -->
            <div class="report clearfix">
                <div class="report_top clearfix">
                    <div class="report_top_title_box">
                        <div class="report_top_title_box_left">
                            <span class="report_top_title">Hash report for MD5: </span>
                            <span class="report_top_name" :class="{red:hash_data.Zone=='Red',yellow:hash_data.Zone=='Yellow',grey:hash_data.Zone=='Grey',green:hash_data.Zone=='Green'}">{{hash_data.Zone_hoohoolab}}</span>
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
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.HitsCount">{{hash_data.FileGeneralInfo.HitsCount}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">First Seen</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.FirstSeen">{{hash_data.FileGeneralInfo.FirstSeen}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Last Seen</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.LastSeen">{{hash_data.FileGeneralInfo.LastSeen}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Format</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Type">{{hash_data.FileGeneralInfo.Type}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Size</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Size">{{hash_data.FileGeneralInfo.Size}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Signed By</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Signer">{{hash_data.FileGeneralInfo.Signer}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Packed By</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Packer">{{hash_data.FileGeneralInfo.Packer}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">MD5</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Md5">{{hash_data.FileGeneralInfo.Md5}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">SHA-256</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Sha256">{{hash_data.FileGeneralInfo.Sha256}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">SHA-1</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileGeneralInfo.Sha1">{{hash_data.FileGeneralInfo.Sha1}}</p>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <!-- Detection name -->
            <div class="detection" v-if="item_type.detection">
                <div class="detection_top ">
                    <span class="detection_top_name">Detection name</span>
                    <!-- <img class="detection_top_img" src="../common/image/ip/info.png" alt=""> -->
                </div>
                <div class="detection_bom">
                    <el-row class="detection_bom_box" :gutter="80">
                        <el-col :span="6" class="detection_bom_item" v-for="(item,index) in hash_data.DetectionsInfo" :key="index">
                            <div class="detection_bom_item_box">
                                <p class="detection_bom_item_box_name">{{item.LastDetectDate}}</p>
                                <p class="detection_bom_item_box_value" :title="item.DetectionName">{{item.DetectionName}}</p>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>

            <!-- File signatures and certificates -->
            <div class="report clearfix" v-if="item_type.signatures">
                <div class="report_top clearfix" style="height:58px;">
                    <div class="report_top_title_box">
                        <div class="report_top_title_box_left">
                            <span class="report_top_title">File signatures and certificates</span>
                            <!-- <img class="report_top_img" src="../common/image/ip/info.png" alt=""> -->
                        </div>
                    </div>
                </div>
                <div class="report_mid">
                    <el-row class="report_mid_item">
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Vendor</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].Vendor">{{hash_data.FileCertificates[0].Vendor}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Publisher</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].Publisher">{{hash_data.FileCertificates[0].Publisher}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Signed</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].TimeStamp">{{hash_data.FileCertificates[0].TimeStamp}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Issued</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].Issued">{{hash_data.FileCertificates[0].Issued}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Expires</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].Expires">{{hash_data.FileCertificates[0].Expires}}</p>
                        </el-col>
                        <el-col :span="6" class="report_mid_item_col">
                            <p class="report_mid_item_col_name">Seiral Number</p>
                            <p class="report_mid_item_col_value" :title="hash_data.FileCertificates[0].SerialNumber">{{hash_data.FileCertificates[0].SerialNumber}}</p>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <!-- File names-File paths -->
            <div class="file">
                <el-row class="file_box">
                    <el-col :span="12" class="file_box_item" v-if="item_type.names" style="padding-right: 10px;">
                        <div class="file_box_item_top ">
                            <span class="file_box_item_top_name">File names</span>
                            <!-- <img class="file_box_item_top_img" src="../common/image/ip/info.png" alt="">
                            <span class="file_box_item_top_right">
                                <img class="file_box_item_top_right_img" src="../common/image/ip/down.png" alt="">
                                <span class="file_box_item_top_right_name">Download Data</span>
                            </span> -->
                        </div>
                        <div class="file_box_item_bom">
                            <table>
                                <tr>
                                    <th style="padding-left:36px;">Hits(≈)</th>
                                    <th style="padding-right:36px;">File name</th>
                                </tr>
                                <tr v-for="item in FilenamespageArr">
                                    <td style="padding-left:36px;" :title="item.FileNamesHitsCount">{{item.FileNamesHitsCount}}</td>
                                    <td style="padding-right:36px;" :title="item.FileName">
                                        {{item.FileName}}
                                    </td>
                                </tr>
                            </table>
                            <v-page class="downloaded_page" :total-row="FilenamestotalRow" :page-size-menu='false' @page-change="FilenamespageChange" :border="false" align="center"></v-page>
                        </div>
                    </el-col>
                    <el-col :span="12" class="file_box_item" v-if="item_type.paths" style="padding-left: 10px;">
                        <div class="file_box_item_top ">
                            <span class="file_box_item_top_name">File paths</span>
                            <!-- <img class="file_box_item_top_img" src="../common/image/ip/info.png" alt="">
                            <span class="file_box_item_top_right">
                                <img class="file_box_item_top_right_img" src="../common/image/ip/down.png" alt="">
                                <span class="file_box_item_top_right_name">Download Data</span>
                            </span> -->
                        </div>
                        <div class="file_box_item_bom">
                            <table>
                                <tr>
                                    <th style="padding-left:36px;">Hits(≈)</th>
                                    <th>Path</th>
                                    <th style="padding-right:36px;">Loaction</th>
                                </tr>
                                <tr v-for="item in FilePathspageArr">
                                    <td style="padding-left:36px;" :title="item.FilePathHitsCount">{{item.FilePathHitsCount}}</td>
                                    <td :title="item.Path">{{item.Path}}</td>
                                    <td style="padding-right:36px;" :title="item.Location">
                                        {{item.Location}}
                                    </td>
                                </tr>
                            </table>
                            <v-page class="downloaded_page" :total-row="FilePathstotalRow" :page-size-menu='false' @page-change="FilePathspageChange" :border="false" align="center"></v-page>
                        </div>

                    </el-col>
                </el-row>
            </div>

            <!-- File downloaded form URLs and Domains -->
            <div class="downloaded clearfix" v-if="item_type.downloaded">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">File downloaded form URLs and Domains</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 850px;">URL</th>
                            <th style="padding-right:36px;">Last Download</th>
                        </tr>
                        <tr v-for="item in downloadedpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.Url">{{item.Url?item.Url:'-'}}</td>
                            <td style="padding-right:36px;" :title="item.LastDownloadDate">
                                {{item.LastDownloadDate}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" :total-row="downloadedtotalRow" :page-size-menu='false' @page-change="downloadedpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <!-- File accessed following URLs -->
            <div class="downloaded clearfix" v-if="item_type.accessed">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">File accessed following URLs</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th style="width: 850px;">URL</th>
                            <th style="padding-right:36px;">Last Accessed</th>
                        </tr>
                        <tr v-for="item in  accessedpageArr">
                            <td style="padding-left:36px;" :title="item.Zone_hoohoolab">
                                <img class="Zone_img" src="../common/image/ip/red.png" alt="" v-if="item.Zone=='Red'">
                                <img class="Zone_img" src="../common/image/ip/yellow.png" v-if="item.Zone=='Yellow'" alt="">
                                <img class="Zone_img" src="../common/image/ip/green.png" v-if="item.Zone=='Green'" alt="">
                                <img class="Zone_img" src="../common/image/ip/grey.png" v-if="item.Zone=='Grey'" alt="">
                                <span :class="{red:item.Zone=='Red',yellow:item.Zone=='Yellow',grey:item.Zone=='Grey',green:item.Zone=='Green'}" class="Zone_name">
                                    {{item.Zone_hoohoolab}}
                                </span>
                            </td>
                            <td :title="item.Url">{{item.Url?item.Url:'-'}}</td>
                            <td style="padding-right:36px;" :title="item.LastDownloadDate">
                                {{item.LastDownloadDate}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" :total-row="accessedtotalRow" :page-size-menu='false' @page-change="accessedpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <!-- Files start following objects -->
            <div class="downloaded clearfix" v-if="item_type.start">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">Files start following objects</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th>Hits(≈)</th>
                            <th>Files MD5</th>
                            <th>Location</th>
                            <th>Path</th>
                            <th>File Name</th>
                            <th>Last Started</th>
                            <th style="padding-right:36px;">Detection Name</th>
                        </tr>
                        <tr v-for="item in  startpageArr">
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
                            <td :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.Location">{{item.Location}}</td>
                            <td :title="item.Path">{{item.Path}}</td>
                            <td :title="item.Name">{{item.Name}}</td>
                            <td :title="item.LastStartDate">{{item.LastStartDate}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">
                                {{item.DetectionName}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" :total-row="starttotalRow" :page-size-menu='false' @page-change="startpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <!-- Files was started by following objects -->
            <div class="downloaded clearfix" v-if="item_type.was">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">Files was started by following objects</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th>Hits(≈)</th>
                            <th>Files MD5</th>
                            <th>Location</th>
                            <th>Path</th>
                            <th>File Name</th>
                            <th>Last Started</th>
                            <th style="padding-right:36px;">Detection Name</th>
                        </tr>
                        <tr v-for="item in  waspageArr">
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
                            <td :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.Location">{{item.Location}}</td>
                            <td :title="item.Path">{{item.Path}}</td>
                            <td :title="item.Name">{{item.Name}}</td>
                            <td :title="item.LastStartDate">{{item.LastStartDate}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">
                                {{item.DetectionName}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" :total-row="wastotalRow" :page-size-menu='false' @page-change="waspageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <!-- Files downloaded following objects -->
            <div class="downloaded clearfix" v-if="item_type.following">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">Files downloaded following objects</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right" :class="{'disabled_class':objdownloadedpageArr.length==0}">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th>Hits(≈)</th>
                            <th>Files MD5</th>
                            <th>Location</th>
                            <th>Path</th>
                            <th>File Name</th>
                            <th>Last Download</th>
                            <th style="padding-right:36px;">Detection Name</th>
                        </tr>
                        <tr v-for="item in  objdownloadedpageArr">
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
                            <td :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.Location">{{item.Location}}</td>
                            <td :title="item.Path">{{item.Path}}</td>
                            <td :title="item.Name">{{item.Name}}</td>
                            <td :title="item.LastDownloadDate">{{item.LastDownloadDate}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">
                                {{item.DetectionName}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" v-if="objdownloadedpageArr.length!=0" :total-row="objdownloadedtotalRow" :page-size-menu='false' @page-change="objdownloadedpageChange" :border="false" align="center"></v-page>
                </div>
            </div>
            <!-- Files was downloaded by following objects-->
            <div class="downloaded clearfix" v-if="item_type.objects">
                <div class="downloaded_top ">
                    <span class="downloaded_top_name">Files was downloaded by following objects</span>
                    <!-- <img class="downloaded_top_img" src="../common/image/ip/info.png" alt="">
                    <span class="downloaded_top_right">
                        <img class="downloaded_top_right_img" src="../common/image/ip/down.png" alt="">
                        <span class="downloaded_top_right_name">Download Data</span>
                    </span> -->
                </div>
                <div class="downloaded_bom">
                    <table>
                        <tr>
                            <th style="padding-left:36px;">Status</th>
                            <th>Hits(≈)</th>
                            <th>Files MD5</th>
                            <th>Location</th>
                            <th>Path</th>
                            <th>File Name</th>
                            <th>Last Download</th>
                            <th style="padding-right:36px;">Detection Name</th>
                        </tr>
                        <tr v-for="item in  objwaspageArr">
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
                            <td :title="item.Md5">{{item.Md5}}</td>
                            <td :title="item.Location">{{item.Location}}</td>
                            <td :title="item.Path">{{item.Path}}</td>
                            <td :title="item.Name">{{item.Name}}</td>
                            <td :title="item.LastDownloadDate">{{item.LastDownloadDate}}</td>
                            <td style="padding-right:36px;" :title="item.DetectionName">
                                {{item.DetectionName}}
                            </td>
                        </tr>
                    </table>
                    <v-page class="downloaded_page" :total-row="objwastotalRow" :page-size-menu='false' @page-change="objwaspageChange" :border="false" align="center"></v-page>
                </div>
            </div>

        </div>
    </div>
</template>
<style  lang="less">
.hash {
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
      padding-bottom: 15px;
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
    .detection {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .detection_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .detection_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          vertical-align: middle;
        }
        .detection_top_img {
          vertical-align: sub;
        }
      }
      .detection_bom {
        padding: 0 36px;
        padding-bottom: 20px;
        .detection_bom_box {
          .detection_bom_item {
            height: 76px;
            margin-top: 25px;
            .detection_bom_item_box {
              height: 76px;
              background: #ffffff;
              box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.16);
              border-radius: 4px;
              border-left: 4px solid #ff5f5c;
              padding: 16px;
              .detection_bom_item_box_name {
                font-size: 12px;
                color: #999999;
                margin-bottom: 8px;
              }
              .detection_bom_item_box_value {
                font-size: 14px;
                color: #0070ff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    .file {
      margin-top: 24px;
      .file_box {
        margin: 0 !important;
        .file_box_item {
          .file_box_item_top {
            background: #ffffff;
            border-radius: 6px 6px 0 0;
            padding: 0 36px;
            height: 58px;
            border-bottom: 1px solid #ececec;
            line-height: 58px;
            .file_box_item_top_name {
              font-size: 16px;
              color: #333333;
              font-weight: 600;
              vertical-align: middle;
            }
            .file_box_item_top_img {
              vertical-align: sub;
            }
            .file_box_item_top_right {
              float: right;
              cursor: pointer;
              .file_box_item_top_right_name {
                color: #0070ff;
                vertical-align: middle;
              }
              .file_box_item_top_right_img {
                vertical-align: middle;
                margin-right: 5px;
              }
            }
          }
          .file_box_item_bom {
            background: #fff;
            border-radius: 0 0 6px 6px;
            .downloaded_page {
              padding: 10px;
              ul {
                li {
                  //   margin: 0 5px;
                }
              }
            }
          }
        }
      }
    }
    .downloaded {
      margin-top: 24px;
      background: #ffffff;
      border-radius: 6px;
      .downloaded_top {
        height: 58px;
        padding: 0 36px;
        border-bottom: 1px solid #ececec;
        line-height: 58px;
        .downloaded_top_name {
          font-size: 16px;
          color: #333333;
          font-weight: 600;
          vertical-align: middle;
        }
        .downloaded_top_img {
          vertical-align: sub;
        }
        .downloaded_top_right {
          float: right;
          cursor: pointer;
          .downloaded_top_right_name {
            color: #0070ff;
            vertical-align: middle;
          }
          .downloaded_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
        .disabled_class {
          .downloaded_top_right_name {
            color: #bbb;
          }
          .downloaded_top_right_img {
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
      .downloaded_bom {
        .downloaded_page {
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
      item_type: {
        detection: false,
        signatures: false,
        names: false,
        paths: false,
        downloaded: false,
        accessed: false,
        start: false,
        was: false,
        following: false,
        objects: false
      },
      hash_data: "",
      indicator: "",
      downloadedtotalRow: 100,
      downloadedpageArr: [],
      accessedtotalRow: 100,
      accessedpageArr: [],
      starttotalRow: 100,
      startpageArr: [],
      wastotalRow: 100,
      waspageArr: [],
      objdownloadedtotalRow: 100,
      objdownloadedpageArr: [],
      objwastotalRow: 100,
      objwaspageArr: [],
      FilenamestotalRow: 100,
      FilenamespageArr: [],
      FilePathstotalRow: 100,
      FilePathspageArr: [],
      loading: true
    };
  },
  created() {
    // console.log(this.$route.query.name);
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
        //     .get("/intelligence/extension")
        .then(response => {
          if (response.data.status == "success") {
            switch (response.data.data.result.Zone) {
              case "Red":
                response.data.data.result.Zone_hoohoolab = "Malware";
                break;
              case "Yellow":
                response.data.data.result.Zone_hoohoolab = "Adware and other";
                break;
              case "Grey":
                response.data.data.result.Zone_hoohoolab = "Not categorized";
                break;
              case "Green":
                response.data.data.result.Zone_hoohoolab = "Clean";
                break;
              default:
                break;
            }
            if (response.data.data.result.DetectionsInfo) {
              this.item_type.detection = true;
            }
            if (response.data.data.result.FileCertificates) {
              this.item_type.signatures = true;
            }
            if (response.data.data.result.FileNames) {
              this.item_type.names = true;
              this.FilenamestotalRow =
                response.data.data.result.FileNames.length;
            }
            if (response.data.data.result.FilePaths) {
              this.FilePathstotalRow =
                response.data.data.result.FilePaths.length;
              this.item_type.paths = true;
            }
            if (response.data.data.result.FileDownloadedFromUrls) {
              response.data.data.result.FileDownloadedFromUrls.forEach(item => {
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
              this.downloadedtotalRow =
                response.data.data.result.FileDownloadedFromUrls.length;
              this.item_type.downloaded = true;
            } else {
              this.downloadedtotalRow = 0;
            }

            if (response.data.data.result.FileAccessedUrls) {
              response.data.data.result.FileAccessedUrls.forEach(item => {
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
              this.accessedtotalRow =
                response.data.data.result.FileAccessedUrls.length;
              this.item_type.accessed = true;
            } else {
              this.accessedtotalRow = 0;
            }
            if (response.data.data.result.FileStartedObjects) {
              response.data.data.result.FileStartedObjects.forEach(item => {
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
              this.starttotalRow =
                response.data.data.result.FileStartedObjects.length;
              this.item_type.start = true;
            } else {
              this.starttotalRow = 0;
            }
            if (response.data.data.result.FileStartedBy) {
              response.data.data.result.FileStartedBy.forEach(item => {
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
              this.wastotalRow = this.hash_data.FileStartedBy.length;
              this.item_type.was = true;
            } else {
              this.wastotalRow = 0;
            }
            if (response.data.data.result.FileDownloadedObjects) {
              response.data.data.result.FileDownloadedObjects.forEach(item => {
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
              this.objdownloadedtotalRow =
                response.data.data.result.FileDownloadedObjects.length;
              this.item_type.following = true;
            } else {
              this.objdownloadedtotalRow = 0;
            }
            if (response.data.data.result.FileDownloadedBy) {
              response.data.data.result.FileDownloadedBy.forEach(item => {
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
              this.objwastotalRow =
                response.data.data.result.FileDownloadedBy.length;
              this.item_type.objects = true;
            } else {
              this.objwastotalRow = 0;
            }
            this.hash_data = response.data.data.result;
            setTimeout(() => {
              this.loading = false;
            }, 4000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    downloadedpageChange(pInfo) {
      if (this.hash_data.FileDownloadedFromUrls) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileDownloadedFromUrls.length) {
          end = this.hash_data.FileDownloadedFromUrls.length;
        }
        this.downloadedpageArr.splice(0, this.downloadedpageArr.length);
        for (let i = start; i < end; i++) {
          this.downloadedpageArr.push(this.hash_data.FileDownloadedFromUrls[i]);
        }
      }
    },
    accessedpageChange(pInfo) {
      if (this.hash_data.FileAccessedUrls) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileAccessedUrls.length) {
          end = this.hash_data.FileAccessedUrls.length;
        }
        this.accessedpageArr.splice(0, this.accessedpageArr.length);
        for (let i = start; i < end; i++) {
          this.accessedpageArr.push(this.hash_data.FileAccessedUrls[i]);
        }
      }
    },
    startpageChange(pInfo) {
      if (this.hash_data.FileStartedObjects) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileStartedObjects.length) {
          end = this.hash_data.FileStartedObjects.length;
        }
        this.startpageArr.splice(0, this.startpageArr.length);
        for (let i = start; i < end; i++) {
          this.startpageArr.push(this.hash_data.FileStartedObjects[i]);
        }
      }
    },
    waspageChange(pInfo) {
      if (this.hash_data.FileStartedBy) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileStartedBy.length) {
          end = this.hash_data.FileStartedBy.length;
        }
        this.waspageArr.splice(0, this.waspageArr.length);
        for (let i = start; i < end; i++) {
          this.waspageArr.push(this.hash_data.FileStartedBy[i]);
        }
      }
    },
    objdownloadedpageChange(pInfo) {
      if (this.hash_data.FileDownloadedObjects) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileDownloadedObjects.length) {
          end = this.hash_data.FileDownloadedObjects.length;
        }
        this.objdownloadedpageArr.splice(0, this.objdownloadedpageArr.length);
        for (let i = start; i < end; i++) {
          this.objdownloadedpageArr.push(
            this.hash_data.FileDownloadedObjects[i]
          );
        }
      } else {
        this.objdownloadedpageArr = [];
      }
    },
    objwaspageChange(pInfo) {
      if (this.hash_data.FileDownloadedBy) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileDownloadedBy.length) {
          end = this.hash_data.FileDownloadedBy.length;
        }
        this.objwaspageArr.splice(0, this.objwaspageArr.length);
        for (let i = start; i < end; i++) {
          this.objwaspageArr.push(this.hash_data.FileDownloadedBy[i]);
        }
      }
    },
    FilenamespageChange(pInfo) {
      if (this.hash_data.FileNames) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FileNames.length) {
          end = this.hash_data.FileNames.length;
        }
        this.FilenamespageArr.splice(0, this.FilenamespageArr.length);
        for (let i = start; i < end; i++) {
          this.FilenamespageArr.push(this.hash_data.FileNames[i]);
        }
      }
    },
    FilePathspageChange(pInfo) {
      if (this.hash_data.FilePaths) {
        let start = 0,
          end = 0;
        start = pInfo.pageSize * (pInfo.pageNumber - 1);
        end = start + pInfo.pageSize;
        if (end > this.hash_data.FilePaths.length) {
          end = this.hash_data.FilePaths.length;
        }
        this.FilePathspageArr.splice(0, this.FilePathspageArr.length);
        for (let i = start; i < end; i++) {
          this.FilePathspageArr.push(this.hash_data.FilePaths[i]);
        }
      }
    }
  }
};
</script>


