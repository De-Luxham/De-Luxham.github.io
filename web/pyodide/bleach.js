var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="bleach.data";var REMOTE_PACKAGE_BASE="bleach.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","bleach",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach","_vendor",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor","html5lib-1.0.1.dist-info",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor","html5lib",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor/html5lib","treeadapters",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor/html5lib","_trie",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor/html5lib","treebuilders",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor/html5lib","filters",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages/bleach/_vendor/html5lib","treewalkers",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","bleach-3.1.0-py3.7.egg-info",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:299501,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1292,2542,3711,4824,5829,7053,8215,9411,10470,11639,13033,14285,15922,17522,18748,20004,21299,22329,23301,24164,25381,26406,27678,28835,29961,31060,32143,33394,34645,35870,37134,38408,39973,41375,42684,43902,45449,47038,48480,50076,51635,53215,54238,55421,56975,58515,59980,61611,63198,64463,65319,66e3,66856,67548,68239,69015,69649,70212,71239,72314,73421,74547,75518,76380,77324,78159,78934,79931,80799,81736,82669,83606,84505,85435,86375,87320,88231,89153,90048,90995,91822,92632,93532,94482,95408,96327,97131,98079,98989,99916,101287,102731,103904,104911,106151,107287,108167,109220,110532,111581,112652,113594,114044,114674,115466,116268,117185,118147,118998,119870,120833,121742,122785,123807,124597,125407,126067,126920,127733,128537,129466,130392,131083,132121,133116,133929,134763,135754,136798,137556,138493,139415,140354,141268,142078,143019,143700,144641,145597,146486,147428,148116,148956,149943,150828,151733,152588,153450,154205,154806,155921,157079,158247,159456,160693,161880,163059,164354,165568,166389,167472,168472,169564,170553,171658,172520,173584,174800,176116,177421,178823,180349,181901,182822,183812,185113,186113,187247,188281,189332,190171,190978,191759,192456,193291,193903,194551,195144,195626,196231,196895,197315,197894,198658,199603,200319,200943,201624,202375,203287,203799,204309,204901,205465,206226,207100,207679,208251,208746,209302,209818,210494,211740,212957,214142,215348,216384,217294,218035,219092,220266,221339,222470,223446,224399,225306,226282,227151,228466,229687,230945,231976,233061,234210,235188,236198,237307,238733,239576,240512,241517,242345,243444,244543,245591,246525,247441,248279,249228,250126,251235,251812,252297,252908,253628,254317,255075,255845,256880,257868,258831,260101,261111,262349,263235,264419,265215,266129,267056,268006,268857,269605,270488,271534,272806,273925,274802,276023,277006,277952,278733,279724,280753,281767,283074,283810,284709,285576,286948,288234,289397,290533,291575,292796,294005,295136,296487,297546,298613],sizes:[1292,1250,1169,1113,1005,1224,1162,1196,1059,1169,1394,1252,1637,1600,1226,1256,1295,1030,972,863,1217,1025,1272,1157,1126,1099,1083,1251,1251,1225,1264,1274,1565,1402,1309,1218,1547,1589,1442,1596,1559,1580,1023,1183,1554,1540,1465,1631,1587,1265,856,681,856,692,691,776,634,563,1027,1075,1107,1126,971,862,944,835,775,997,868,937,933,937,899,930,940,945,911,922,895,947,827,810,900,950,926,919,804,948,910,927,1371,1444,1173,1007,1240,1136,880,1053,1312,1049,1071,942,450,630,792,802,917,962,851,872,963,909,1043,1022,790,810,660,853,813,804,929,926,691,1038,995,813,834,991,1044,758,937,922,939,914,810,941,681,941,956,889,942,688,840,987,885,905,855,862,755,601,1115,1158,1168,1209,1237,1187,1179,1295,1214,821,1083,1e3,1092,989,1105,862,1064,1216,1316,1305,1402,1526,1552,921,990,1301,1e3,1134,1034,1051,839,807,781,697,835,612,648,593,482,605,664,420,579,764,945,716,624,681,751,912,512,510,592,564,761,874,579,572,495,556,516,676,1246,1217,1185,1206,1036,910,741,1057,1174,1073,1131,976,953,907,976,869,1315,1221,1258,1031,1085,1149,978,1010,1109,1426,843,936,1005,828,1099,1099,1048,934,916,838,949,898,1109,577,485,611,720,689,758,770,1035,988,963,1270,1010,1238,886,1184,796,914,927,950,851,748,883,1046,1272,1119,877,1221,983,946,781,991,1029,1014,1307,736,899,867,1372,1286,1163,1136,1042,1221,1209,1131,1351,1059,1067,888],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_bleach.data")}Module["addRunDependency"]("datafile_bleach.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/bleach/callbacks.py",start:0,end:804,audio:0},{filename:"/lib/python3.7/site-packages/bleach/sanitizer.py",start:804,end:21686,audio:0},{filename:"/lib/python3.7/site-packages/bleach/__init__.py",start:21686,end:25461,audio:0},{filename:"/lib/python3.7/site-packages/bleach/linkifier.py",start:25461,end:45057,audio:0},{filename:"/lib/python3.7/site-packages/bleach/utils.py",start:45057,end:46172,audio:0},{filename:"/lib/python3.7/site-packages/bleach/html5lib_shim.py",start:46172,end:64101,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/__init__.py",start:64101,end:64101,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/README.rst",start:64101,end:65358,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/vendor.txt",start:65358,end:65544,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/pip_install_vendor.sh",start:65544,end:65634,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/INSTALLER",start:65634,end:65638,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/top_level.txt",start:65638,end:65647,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/RECORD",start:65647,end:69247,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/metadata.json",start:69247,end:70978,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/DESCRIPTION.rst",start:70978,end:84741,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/LICENSE.txt",start:84741,end:85825,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/METADATA",start:85825,end:101309,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib-1.0.1.dist-info/WHEEL",start:101309,end:101422,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/constants.py",start:101422,end:184940,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/__init__.py",start:184940,end:186085,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_utils.py",start:186085,end:190088,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/html5parser.py",start:190088,end:309039,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_inputstream.py",start:309039,end:341538,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_ihatexml.py",start:341538,end:358243,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_tokenizer.py",start:358243,end:434811,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/serializer.py",start:434811,end:450557,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treeadapters/genshi.py",start:450557,end:452272,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treeadapters/__init__.py",start:452272,end:452922,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treeadapters/sax.py",start:452922,end:454698,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_trie/_base.py",start:454698,end:455628,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_trie/__init__.py",start:455628,end:455917,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_trie/datrie.py",start:455917,end:457083,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/_trie/py.py",start:457083,end:458846,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treebuilders/dom.py",start:458846,end:467681,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treebuilders/__init__.py",start:467681,end:471273,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treebuilders/base.py",start:471273,end:485840,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treebuilders/etree_lxml.py",start:485840,end:499962,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treebuilders/etree.py",start:499962,end:512714,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/whitespace.py",start:512714,end:513928,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/sanitizer.py",start:513928,end:540164,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/__init__.py",start:540164,end:540164,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/inject_meta_charset.py",start:540164,end:543109,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/base.py",start:543109,end:543395,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/alphabeticalattributes.py",start:543395,end:544314,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/lint.py",start:544314,end:547945,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/filters/optionaltags.py",start:547945,end:558533,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/genshi.py",start:558533,end:560842,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/dom.py",start:560842,end:562255,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/__init__.py",start:562255,end:567969,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/base.py",start:567969,end:575445,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/etree_lxml.py",start:575445,end:581742,audio:0},{filename:"/lib/python3.7/site-packages/bleach/_vendor/html5lib/treewalkers/etree.py",start:581742,end:586280,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/SOURCES.txt",start:586280,end:589546,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/not-zip-safe",start:589546,end:589547,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/top_level.txt",start:589547,end:589554,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/dependency_links.txt",start:589554,end:589555,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/requires.txt",start:589555,end:589579,audio:0},{filename:"/lib/python3.7/site-packages/bleach-3.1.0-py3.7.egg-info/PKG-INFO",start:589579,end:614232,audio:0}],remote_package_size:303597,package_uuid:"ce52537a-cfd3-4d2b-9e83-867c067b8031"})})();