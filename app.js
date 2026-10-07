// Shared header, navigation, breadcrumb, footer and accessibility tools
var pages = [["index.html","Home"],["scope.html","Scope"],["principles.html","Principles"],["compare.html","Good vs Bad"],["users.html","Users"],["sitemap.html","Sitemap"],["form.html","Feedback Form"],["accessibility.html","Accessibility"],["prototype.html","Prototype"],["evaluation.html","Evaluation"]];
var cur = location.pathname.split("/").pop() || "index.html";
var title = document.body.dataset.title || "Home";
function pref(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} }

var nav = pages.map(function (p) { return '<a href="' + p[0] + '"' + (p[0] === cur ? ' class="on" aria-current="page"' : '') + '>' + p[1] + '</a>'; }).join("");
var opts = pages.map(function (p) { return '<option value="' + p[1] + '">'; }).join("");
document.body.insertAdjacentHTML("afterbegin",
  '<a class="skip" href="#main">Skip to content</a>' +
  '<div class="student">Name: Ahmad Imran | SAP ID: 65171 | HCI Complete Website</div>' +
  '<header><a class="logo" href="index.html">🧠 HCI Explained</a><nav aria-label="Main menu">' + nav + '</nav>' +
  '<div class="tools"><input id="q" list="pl" placeholder="Search page..." aria-label="Search pages"><datalist id="pl">' + opts + '</datalist>' +
  '<button id="bDark" aria-label="Dark mode">🌙</button><button id="bHc" aria-label="High contrast">◐</button>' +
  '<button id="bFp" aria-label="Smaller text">A-</button><button id="bFm" aria-label="Bigger text">A+</button></div></header>' +
  '<div class="crumb"><a href="index.html">Home</a> &gt; ' + title + '</div>');
var main = document.getElementById("main");
if (document.body.dataset.principle) main.insertAdjacentHTML("afterbegin", '<p class="pr"><b>HCI principle demonstrated:</b> ' + document.body.dataset.principle + '</p>');
document.body.insertAdjacentHTML("beforeend", '<footer><a href="#main">↑ Back to top</a><br>Ahmad Imran (SAP 65171) - HCI Lab 06 - Complete Website</footer>');

// Search: go to the matching page
document.getElementById("q").onkeydown = function (e) {
  if (e.key !== "Enter") return;
  var v = this.value.toLowerCase();
  var f = pages.filter(function (p) { return p[1].toLowerCase().indexOf(v) > -1; })[0];
  if (f) location.href = f[0]; else this.value = "No match";
};
// Accessibility tools (saved for next page)
var size = parseInt(pref("sz") || 16);
function apply() {
  document.documentElement.style.fontSize = size + "px";
  document.body.classList.toggle("dark", pref("dk") === "1");
  document.body.classList.toggle("hc", pref("hc") === "1");
}
document.getElementById("bDark").onclick = function () { pref("dk", pref("dk") === "1" ? "0" : "1"); apply(); };
document.getElementById("bHc").onclick = function () { pref("hc", pref("hc") === "1" ? "0" : "1"); apply(); };
document.getElementById("bFp").onclick = function () { size = Math.max(12, size - 2); pref("sz", size); apply(); };
document.getElementById("bFm").onclick = function () { size = Math.min(26, size + 2); pref("sz", size); apply(); };
apply();
