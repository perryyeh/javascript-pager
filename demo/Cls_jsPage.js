/**
*=================================================================
*Name:			叶子js分页样式（ShowoPage Style With JS）
*RCSfile:		Cls_jsPage.js
*Revision:		0.09
*Author:		Yehe(叶子)
*Released:		2005-05-12 23:00:15
*Description:	js分页样式，显示上一页下一页的翻页结果
*Contact:		QQ:311673,MSN:myehe@msn.com
*WebSite:		http://www.yehe.org,http://www.showo.com
*=================================================================
*/

function Cls_jsPage(iRecCount,iPageSize,iPageNum,sName){
	this.iRC=this.FormatNum(iRecCount,1,0,0,0);//总记录条数
	this.iPS=this.FormatNum(iPageSize,1,0,1,0);//每页记录数目
	this.iPN=this.FormatNum(iPageNum,0,0,0,0);//显示的前后页数,0为显示所有,负数为这么多页面一个跳转
	this.sN=sName;//实例对象名
	this.sTPage="{$Page}";//页数
	this.sTPageCount="{$PageCount}";//总页数
	this.sTRecCount="{$RecCount}";//总记录数
	this.sTPageSize="{$PageSize}";//每页记录数
	this.sTPageFrist="{$PageFrist}";//首页
	this.sTPagePrev="{$PagePrev}";//上页
	this.sTPageNext="{$PageNext}";//下页
	this.sTPageLast="{$PageLast}";//尾页
	this.sTPageText="{$PageText}";//数字跳转
	this.sTPageTextF="{$PageTextF}";//数字跳转框架
	this.sTPageInput="{$PageInput}";//输入框跳转
	this.sTPageSelect="{$PageSelect}";//下拉菜单跳转
	this.sTPageNum="{$PageNum}";//数字页数
	this.iPC=this.getPageCount();//得到页数
}
//输入 页数开始值，结尾值
Cls_jsPage.prototype.setPageSE=function(sPageStart,sPageEnd){
	var sPS=sPageStart,sPE=sPageEnd;
	this.sPS=(sPS.length>0)?sPS:"Page=";
	this.sPE=(sPE.length>0)?sPE:"";
}
//输入 网址
Cls_jsPage.prototype.setUrl=function(sUrl){
	var s=sUrl;
	this.Url=(s.length>0)?s:""+document.location.href;
}
//输入 输入框&下拉框name值
Cls_jsPage.prototype.setPageInput=function(sPageInput){
	var sPI=sPageInput;
	this.sPI=(sPI.length>0)?sPI:"Page";
}
//输入 语言 首页(Disable,Enale)
Cls_jsPage.prototype.setPageFrist=function(sDis,sEn){
	this.PF_D=sDis;
	this.PF_E=sEn;
}
//输入 语言 上页
Cls_jsPage.prototype.setPagePrev=function(sDis,sEn){
	this.PP_D=sDis;
	this.PP_E=sEn;
}
//输入 语言 下页
Cls_jsPage.prototype.setPageNext=function(sDis,sEn){
	this.PN_D=sDis;
	this.PN_E=sEn;
}
//输入 语言 尾页
Cls_jsPage.prototype.setPageLast=function(sDis,sEn){
	this.PL_D=sDis;
	this.PL_E=sEn;
}
//输入 语言 数字跳转
Cls_jsPage.prototype.setPageText=function(sDis,sEn){
	this.PT_D=sDis;//"[{$PageNum}]"
	this.PT_E=sEn;//"第{$PageNum}页"
}
//输入 语言 数字跳转外围模板
Cls_jsPage.prototype.setPageTextF=function(sDis,sEn){
	this.PTF_D=sDis;//"&nbsp;{$PageTextF}&nbsp;"
	this.PTF_E=sEn;//"&nbsp;{$PageTextF}&nbsp;"
}
//输入 语言 下拉菜单跳转
Cls_jsPage.prototype.setPageSelect=function(sDis,sEn){
	this.PS_D=sDis;//"[{$PageNum}]"
	this.PS_E=sEn;//"第{$PageNum}页"
}
//输入 css
Cls_jsPage.prototype.setPageCss=function(sCssPageText,sCssPageInput,sCssPageSelect){
	this.CPT=sCssPageText;//数字跳转css
	this.CPI=sCssPageInput;//输入框跳转css
	this.CPS=sCssPageSelect;//下拉菜单跳转css
}
//输入 Html模板
Cls_jsPage.prototype.setHtml=function(sHtml){
	this.Html=sHtml;//Html模板
}
//计算页数
Cls_jsPage.prototype.getPageCount=function(){
	var iRC=this.iRC,iPS=this.iPS;
	var i=Math.ceil(iRC / iPS);//(iRC%iPS==0)?(iRC/iPS):(this.FormatNum((iRC/iPS),1,0,0,0)+1);
	return (i);
}
//取得模板页数和当前页数
Cls_jsPage.prototype.getUrl=function(iType){
	var s=this.Url,sPS=this.sPS,sPE=this.sPE,sTP=this.sTPage,iPC=this.iPC;
	var iT=iType,i;
	if (s.indexOf(sPS)==-1) {	
		s+=((s.indexOf("?")==-1)?"?":"&")+sPS+sTP;
		i=1;
	}
	else {
		sReg="(\\S.*)"+this.FormatReg(sPS)+"(\\d*)"+this.FormatReg(sPE)+"(\\S.*|\\S*)";
		var sPIndex=this.Reg(s,sReg,"$3");
		s=s.replace(sPS+sPIndex+sPE,sPS+sTP+sPE);
		i=this.FormatNum(sPIndex,1,1,0,iPC);
	}
	s=this.Reg(s,"(&+)","&");
	s=this.Reg(s,"(\\?&)","?");
	return (iT==0?s:i);
}
//页面跳转
Cls_jsPage.prototype.PageJump=function(){
	var sPL,sPV,sP;
	var sU=this.getUrl(0),iPI=this.getUrl(1);
	var sPI=this.sPI,sTP=this.sTPage,iPC=this.iPC;
	sPL=document.getElementsByName(sPI).length;
	for (var i=0;i<sPL;i++)	{
		sPV=document.getElementsByName(sPI)[i].value;
		sP=this.FormatNum(sPV,1,1,0,iPC);
		if (sP>0) {
			location.href=sU.replace(sTP,sP);
			break;
		}
	}
}
//输出
Cls_jsPage.prototype.Write=function(){
	var sU=this.getUrl(0),iPI=this.getUrl(1);
	var sN=this.sN,sPI=this.sPI;
	var iPC=this.iPC,iPN=this.iPN;;
	var iRC=this.iRC,iPS=this.iPS;
	var PF_D=this.PF_D,PF_E=this.PF_E;
	var PP_D=this.PP_D,PP_E=this.PP_E;
	var PN_D=this.PN_D,PN_E=this.PN_E;
	var PL_D=this.PL_D,PL_E=this.PL_E;
	var PT_D=this.PT_D,PT_E=this.PT_E;
	var PTF_D=this.PTF_D,PTF_E=this.PTF_E;
	var PS_D=this.PS_D,PS_E=this.PS_E;
	var CPT=this.CPT,CPI=this.CPI;
	var CPS=this.CPS,iPN=this.iPN;
	var s=this.Html;
	sTPage=this.sTPage;
	sTPageCount=this.sTPageCount;
	sTRecCount=this.sTRecCount;
	sTPageSize=this.sTPageSize;
	sTPFrist=this.sTPageFrist;
	sTPPrev=this.sTPagePrev;
	sTPNext=this.sTPageNext;
	sTPLast=this.sTPageLast;
	sTPText=this.sTPageText;
	sTPTextF=this.sTPageTextF;
	sTPInput=this.sTPageInput;
	sTPSelect=this.sTPageSelect;
	sTPageNum=this.sTPageNum;
	var PrevP=this.FormatNum((iPI-1),1,1,1,iPC),NextP=this.FormatNum((iPI+1),1,1,1,iPC);
	var FU,PU,NU,LU;
	var s1="<span class=\""+CPT+"\"><A href=\"",s2="\">",s3="</A></span>";
	var s4="<span class=\""+CPT+"\">",s5="</span>";
	if (iPI<=1&&iPC<=1) {
		FU=s4+PF_D+s5;
		PU=s4+PP_D+s5;
		NU=s4+PN_D+s5;
		LU=s4+PL_D+s5;
	}
	else if (iPI==1&&iPC>1) {
		FU=s4+PF_D+s5;
		PU=s4+PP_D+s5;
		NU=s1+sU.replace(sTPage,NextP)+s2+PN_E+s3;
		LU=s1+sU.replace(sTPage,iPC)+s2+PL_E+s3;
	}
	else if (iPI==iPC) {
		FU=s1+sU.replace(sTPage,1)+s2+PF_E+s3;
		PU=s1+sU.replace(sTPage,PrevP)+s2+PP_E+s3;
		NU=s4+PN_D+s5;
		LU=s4+PL_D+s5;
	}
	else {
		FU=s1+sU.replace(sTPage,1)+s2+PF_E+s3;
		PU=s1+sU.replace(sTPage,PrevP)+s2+PP_E+s3;
		NU=s1+sU.replace(sTPage,NextP)+s2+PN_E+s3;
		LU=s1+sU.replace(sTPage,iPC)+s2+PL_E+s3;
	}
	var PageStart,PageEnd;
	if (iPN<0) {
		iPN=Math.abs(iPN);
		PageStart=(iPI%iPN==0)?(iPI/iPN):(this.FormatNum((iPI/iPN),1,0,0,0));
		PageStart=(PageStart*iPN==iPI)?((PageStart-1)*iPN+1):(PageStart*iPN+1);
		PageEnd=this.FormatNum(PageStart+iPN,0,1,0,iPC)
	}
	else if (iPN==0) {
		PageStart=1;
		PageEnd=iPC;
	}
	else {
		PageStart=this.FormatNum((iPI-iPN),1,0,1,0);
		PageEnd=this.FormatNum((PageStart+iPN*2),0,1,0,iPC);
		PageStart=(PageEnd==iPC)?this.FormatNum((PageEnd-iPN*2),1,0,1,0):PageStart;
	}
	var PSelect="",PText="",PInput="",p;
	if (iPC>=1) {
		PSelect="<Select class=\""+CPS+"\" name=\""+sPI+"\" onChange=\""+sN+".PageJump()\">";
		PInput="<Input class=\""+CPI+"\" type=\"text\" name=\""+sPI+"\" size=\"5\" maxlength=\"10\" onkeydown=\"if (event.keyCode==13) "+sN+".PageJump()\">";
		for (var i=PageStart;i<=PageEnd;i++) {
			if (i!=iPI) {
				p=s1+sU.replace(sTPage,i)+s2+PT_E.replace(sTPageNum,i)+s3;
				PText+=PTF_E.replace(sTPTextF,p);
				PSelect+="<Option value=\""+i+"\">"+PS_E.replace(sTPageNum,i)+"</Option>";
			}
			else {
				p=s4+PT_D.replace(sTPageNum,i)+s5;
				PText+=PTF_D.replace(sTPTextF,p);
				PSelect+="<Option Selected=\"Selected\">"+PS_D.replace(sTPageNum,i)+"</Option>";
			}
		}
		PSelect+="</Select>";
	}
	s=s.replace(sTPage,iPI);
	s=s.replace(sTPageCount,iPC);
	s=s.replace(sTRecCount,iRC);
	s=s.replace(sTPageSize,iPS);
	s=s.replace(sTPFrist,FU);
	s=s.replace(sTPPrev,PU);
	s=s.replace(sTPNext,NU);
	s=s.replace(sTPLast,LU);
	s=s.replace(sTPText,PText);
	s=s.replace(sTPInput,PInput);
	s=s.replace(sTPSelect,PSelect);
	document.write (s);
}
//输入：欲格式化字符，是否有最小值（0表示没有,1表示有），是否有最大值，最小值（默认值），最大值
Cls_jsPage.prototype.FormatNum=function(sNum,bMin,bMax,iMinNum,iMaxNum){
	var i,iN,sN=""+sNum,iMin=iMinNum,iMax=iMaxNum;
	if (sN.length>0) {
		iN=parseInt(sN,10);
		i=(isNaN(iN))?iMin:iN;
		i=(i<iMin&&bMin==1)?iMin:i;
		i=(i>iMax&&bMax==1)?iMax:i;
	}
	else {
		i=iMin;
	}
	return (i);
}
//输入：欲正则字符，正则表达式，替换后字符
Cls_jsPage.prototype.Reg=function(sStr,sReg,sRe){
	var s="",sS=sStr,sR=sReg,sRe=sRe;
	if ((sS.length>0)&&(sR.length>0)) {
		eval("re=/"+sR+"/gim;");
		s=sS.replace(re,sRe);
	}
	return (s);
}
//格式化正则中的特殊字符
Cls_jsPage.prototype.FormatReg=function(sReg){
	var s="",sR=sReg;
	var sF=new Array ("/",".","+","[","]","{","}","$","^","?","*");
	if (sR.length>0) {
		for (var i=0;i<=sF.length;i++) {
			sR=sR.replace(sF[i],"\\"+sF[i]);
		}
		s="("+sR+")";
	}
	return (s);
}