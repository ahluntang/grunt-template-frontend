$(function(){

    //Timeline
    $('.timeline-item-trigger span').click(function(){
        if($(this).hasClass('circle_plus')){$(this).removeClass('circle_plus').addClass('circle_minus');}
        else{$(this).removeClass('circle_minus').addClass('circle_plus');}
    });
    
    $('.timeline-item-title').click(function(){
        $trigger = $(this).parent().parent().find('.timeline-item-trigger span');
        if($trigger.hasClass('circle_plus')){$trigger.removeClass('circle_plus').addClass('circle_minus');}
        else{$trigger.removeClass('circle_minus').addClass('circle_plus');}
    });
    

    //Scroll
    // top of page (action)
    $('.scroller').click(function(e) {
        e.preventDefault();
        var targetScroll = $(this).attr('href');
        var documentBody = (($.browser.chrome)||($.browser.safari)) ? document.body : document.documentElement;
        $(documentBody).stop().animate({scrollTop: $(targetScroll).offset().top}, 1000,'easeInOutCubic');
    });
    
    //Sidebar height
    function sidebarHeight(){
        var height = $('#main-content').height();
        $('#sidebar .sidebar-nav').height(height);
    }
    sidebarHeight();
    
    $('#main-content').resize(function() {
        console.log(height);
        sidebarHeight();
    });
    
    
    //blogitem hover
    $(document).on("mouseenter", '.blogitem, .portfolioitem', function(){
        $('.blogitem-hoverinfo, .portfolioitem-hoverinfo', this).stop(true, true).fadeIn('200', 'easeInOutCubic');
    });
    
    $(document).on("mouseleave", '.blogitem, .portfolioitem', function(){
        $('.blogitem-hoverinfo, .portfolioitem-hoverinfo', this).stop(true, true).fadeOut('200', 'easeInOutCubic');
    });
    

    //viewport listener : load script regarding viewport height
    viewportWidth = $(window).width();
    if(viewportWidth >= 768){viewPortContext = "desktop";}else{viewPortContext = "mobile";}
    
    function conditionalScripts(viewPortContext) {
    
        newViewportWidth = $(window).width();
        if(newViewportWidth >= 768){newViewPortContext = "desktop";}else{newViewPortContext = "mobile";}
        
        if(viewPortContext != newViewPortContext){
        
            if(newViewPortContext == 'desktop'){    //scripts for desktop only
                
                //Add Tooltips
                $('.tips').tooltip();
                
            }else{                                  //scripts for mobile only
                
                //Remove Tooltips
                $('.tips').tooltip('destroy');
                $('.lightbox').unbind("click").photoSwipe();

            }
        }
        
        viewPortContext = newViewPortContext;
    }
    conditionalScripts(); //first execution
    
    $(window).resize(function() { //execution on window resizing
        conditionalScripts();
    });

    
});