(function(e){function n(n){for(var r,i,c=n[0],o=n[1],s=n[2],d=0,v=[];d<c.length;d++)i=c[d],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&v.push(a[i][0]),a[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);u&&u(n);while(v.length)v.shift()();return l.push.apply(l,s||[]),t()}function t(){for(var e,n=0;n<l.length;n++){for(var t=l[n],r=!0,c=1;c<t.length;c++){var o=t[c];0!==a[o]&&(r=!1)}r&&(l.splice(n--,1),e=i(i.s=t[0]))}return e}var r={},a={app:0},l=[];function i(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,i),t.l=!0,t.exports}i.m=e,i.c=r,i.d=function(e,n,t){i.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,n){if(1&n&&(e=i(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(i.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)i.d(t,r,function(n){return e[n]}.bind(null,r));return t},i.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(n,"a",n),n},i.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},i.p="/bad-feeling/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=n,c=c.slice();for(var s=0;s<c.length;s++)n(c[s]);var u=o;l.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";t("85ec")},"1aac":function(e){e.exports=JSON.parse('{"backgrounds":[{"name":"On the streets","skills":[{"name":"Fight","level":1},{"name":"Deceive","level":2},{"name":"Covert","level":1},{"name":"Contacts","level":1}]},{"name":"Detective","skills":[{"name":"Physique","level":1},{"name":"Shoot","level":2},{"name":"Investigate","level":1},{"name":"Fight","level":1}]},{"name":"PhD","skills":[{"name":"Resources","level":1},{"name":"Academics","level":2},{"name":"Engineering","level":1},{"name":"Contacts","level":1}]},{"name":"Priest","skills":[{"name":"Notice","level":1},{"name":"Will","level":2},{"name":"Empathy","level":1},{"name":"Contacts","level":1}]},{"name":"Pilot","skills":[{"name":"Gunnery","level":1},{"name":"Pilot","level":2},{"name":"Engineering","level":1},{"name":"Will","level":1}]},{"name":"Engineer","skills":[{"name":"Academics","level":1},{"name":"Engineering","level":2},{"name":"Notice","level":1},{"name":"Resources","level":1}]}]}')},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var r=t("2b0e"),a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("character",{attrs:{name:"Bob",backgrounds:e.activeBackgrounds}}),t("div",{staticClass:"background-container"},e._l(e.Backgrounds,(function(n){return t("background",{key:n.id,class:{"background-disabled":e.activeBackgrounds.length>=3},attrs:{title:n.title,active:n.active,id:n.id,skills:n.skills},on:{"toggled-background":function(t){return e.toggleBackground(n.id)}}})})),1)],1)},l=[],i=(t("4de4"),t("7db0"),t("4160"),t("b0c0"),t("159b"),t("f5cb")),c=t.n(i),o=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"background",class:{"background-active":e.isActive,"background-inactive":!e.isActive},attrs:{id:e.id},on:{click:function(n){return e.$emit("toggled-background")}}},[t("h3",{attrs:{id:"background-title"}},[e._v(e._s(e.title))]),t("ul",{attrs:{"aria-labelledby":"background-title"}},e._l(e.skills,(function(e){return t("li",{key:e.name},[t("skill",{attrs:{name:e.name,level:e.level}})],1)})),0)])},s=[],u=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"skill"},[e._v(" "+e._s(e.name)+" "+e._s(e.level)+" ")])},d=[],v=(t("a9e3"),{name:"Skill",props:{name:{required:!0,type:String},level:{required:!0,type:Number}}}),f=v,m=(t("c03d"),t("2877")),p=Object(m["a"])(f,u,d,!1,null,null,null),g=p.exports,k={name:"Background",components:{Skill:g},props:{title:{required:!0,type:String},active:{default:!1,type:Boolean},skills:{type:Array,required:!0},id:{required:!0,type:String}},data:function(){return{backgroundSkills:[]}},created:function(){},methods:{loadSkills:function(){this.backgroundSkills=this.skills}},computed:{isActive:function(){return this.active}}},h=k,b=Object(m["a"])(h,o,s,!1,null,null,null),y=b.exports,_=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"character"},[t("label",{attrs:{for:"character-name"}},[e._v("Name: "),t("input",{directives:[{name:"model",rawName:"v-model",value:e.name,expression:"name"}],attrs:{id:"character-name"},domProps:{value:e.name},on:{input:function(n){n.target.composing||(e.name=n.target.value)}}})]),t("div",[t("ul",{attrs:{id:"skills"}},e._l(e.characterSkills,(function(e){return t("li",{key:e.name},[t("skill",{attrs:{name:e.name,level:e.level}})],1)})),0)])])},B=[],S=(t("c975"),t("a434"),{name:"Character",components:{Skill:g},props:{name:{type:String,default:""},backgrounds:{type:Array}},computed:{characterSkills:function(){var e=[];return this.backgrounds.forEach((function(n){n.skills.forEach((function(n){var t=e.find((function(e){return e.name===n.name})),r={name:n.name,level:void 0!==t?t.level+n.level:n.level};e.push(r),void 0!==t&&e.splice(e.indexOf(t),1)}))})),e.sort((function(e,n){return n.level-e.level}))}}}),O=S,j=Object(m["a"])(O,_,B,!1,null,null,null),x=j.exports,P=t("1aac"),w={name:"App",components:{Character:x,Background:y},data:function(){return{Backgrounds:[]}},methods:{toggleBackground:function(e){var n=this.Backgrounds.find((function(n){return n.id===e}));(n.active||this.activeBackgrounds.length<3)&&(n.active=!n.active)},findActiveBackgrounds:function(){return this.Backgrounds.filter((function(e){return!0===e.active}))},importBackgrounds:function(){var e=this;this.Backgrounds=[],P.backgrounds.forEach((function(n){e.Backgrounds.push({id:c()("background-"),title:n.name,skills:n.skills,active:!1})}))}},mounted:function(){this.importBackgrounds()},computed:{activeBackgrounds:function(){return this.findActiveBackgrounds()}}},E=w,A=(t("034f"),Object(m["a"])(E,a,l,!1,null,null,null)),C=A.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(C)}}).$mount("#app")},6265:function(e,n,t){},"85ec":function(e,n,t){},c03d:function(e,n,t){"use strict";t("6265")}});
//# sourceMappingURL=app.9c90dca3.js.map