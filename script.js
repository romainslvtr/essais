document.addEventListener('DOMContentLoaded', function(){
  var toggle = document.querySelector('.menu-toggle');
  var mobile = document.querySelector('.mobile-nav');
  if(toggle && mobile){
    toggle.addEventListener('click', function(){
      var open = mobile.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  var bar = document.querySelector('.progress-bar');
  if(bar){
    window.addEventListener('scroll', function(){
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var pct = max > 0 ? (h.scrollTop / max) * 100 : 0;
      bar.style.width = pct + '%';
    }, {passive:true});
  }
  var filterBtns = document.querySelectorAll('.filter-btn');
  if(filterBtns.length){
    var applyFilter = function(cat){
      filterBtns.forEach(function(b){
        var active = b.dataset.cat === cat;
        b.classList.toggle('active', active);
        b.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
      var visibleCount = 0;
      document.querySelectorAll('#all-essays .essay-entry').forEach(function(entry){
        var show = (cat === 'tous' || entry.dataset.cat === cat);
        entry.style.display = show ? '' : 'none';
        if(show){ visibleCount++; }
      });
      var empty = document.querySelector('.empty-state');
      if(empty){ empty.style.display = visibleCount === 0 ? '' : 'none'; }
    };
    filterBtns.forEach(function(btn){
      btn.addEventListener('click', function(){ applyFilter(btn.dataset.cat); });
    });
    var params = new URLSearchParams(window.location.search);
    var initialCat = params.get('cat');
    if(initialCat){ applyFilter(initialCat); }
  }
});
