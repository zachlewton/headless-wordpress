<?php

/**
 * Plugin Name: Custom API
 * Plugin URI:
 * Description: custom api
 * Version: 1.0
 * Author: zesty lemon
 * Author URI: 
 */

 
 
 //// get projects ////

function get_projects(WP_REST_Request $request){

    $slug = $request['slug'];

    $args = array(
        'numberposts' => -1,
        'post_type' => 'project',
        'name' => $slug,
        
    );

    $posts = new WP_Query($args);
    
    $data = [];
    $i=0;

    foreach($posts->posts as $post){
        $data[$i]['id'] = $post->ID;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['description'] = get_post_meta( $post->ID, 'description', true);
        $i++;

    }

    return $data;
}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'projects(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_projects'


    ]);

}); 


///////////////////////


//////get project galleries /////

function get_galleries(WP_REST_Request $request){

    $slug = $request['slug'];

    $args = array(
        'numberposts' => -1,
        'post_type' => 'project_gallery',
        'tax_query' => array(
            array(
                'taxonomy' => 'gallery_project',
                'field'    => 'slug',
                'terms'    => $slug,
            ),
        ),
    );

    $posts = new WP_Query($args);

    $data = [];
    $i=0;

    foreach($posts->posts as $post){

        $x=0;

        $images =[];


        $data[$i]['id'] = $post->ID;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['gallery_slug'] = $post->post_name;
        
        $imageids= get_post_meta($post->ID, 'images', true);

        foreach($imageids as $imageid){
            $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
            $images[$x]['title']= get_the_title($imageid);
            $images[$x]['caption']=wp_get_attachment_caption($imageid);
            
            $x++;
        }

        $data[$i]['images']=$images;
        
        $thumbnail = get_post_meta($post->ID, 'thumbnail', false );

        $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

        $i++;

    }

    return $data;
}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'project_galleries(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_galleries'


    ]);

});



//////////////////////////////

/////// get sub projects filter by slug ///////////


function get_sub_projects_by_slug(WP_REST_Request $request){

    $slug = $request['slug'];

    $args = array(
        'numberposts' => -1,
        'post_type' => 'sub_projects',
        'tax_query' => array(
            array(
                'taxonomy' => 'gallery_project',
                'field'    => 'slug',
                'terms'    => $slug,
            ),
        ),
        
    );

    $posts = new WP_Query($args);
    
    $data = [];
    $i=0;

    foreach($posts->posts as $post){
        $data[$i]['id'] = $post->ID;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['description'] = $post->post_content;
        $i++;

    }

    return $data;
}





add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_projects(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_sub_projects_by_slug'


    ]);

});

//////////////////////////////////



///////// get sub project galleries /////////



function get_sub_project_galleries(WP_REST_Request $request){

    $slug = $request['slug'];

    $args = array(
        'numberposts' => -1,
        'post_type' => 'sub_project_gallery',
        
        
        
    );

    $posts = new WP_Query($args);
    
    $data = [];
    $i=0;
    
    $images = [];

    foreach($posts->posts as $post){
        
        
        $x=0;
        $parent_project_id = get_post_meta($post->ID, 'parent_project', true)[0];
        // $parent_project_slug = get_post($parent_project_id)->post_name;

        if(get_post($parent_project_id)->post_name === $slug){

            $data[$i]['id'] = $post->ID;
            $data[$i]['gallery_slug'] = $post->post_name;
            $data[$i]['title'] = $post->post_title;
            
            $imageids= get_post_meta($post->ID, 'gallery', true);

            foreach($imageids as $imageid){
                $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
                $images[$x]['title']= get_the_title($imageid);
                $images[$x]['caption']=wp_get_attachment_caption($imageid);
                
                $x++;
            }


            
            $data[$i]['images']=$images;
            $thumbnail = get_post_meta($post->ID, 'thumbnail', false );
            $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

        }
        
        $i++;

    }

    return $data;
}







add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_project_galleries(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_sub_project_galleries'


    ]);

});


///////////////////////////////////


///////// get sub projects by id  /////////

function get_sub_project_by_name(WP_REST_Request $request){

    $sub_project_slug = $request['slug'];

    $args = array(
        'numberposts' => 1,
        'post_type' => 'sub_projects',
        'name' => $sub_project_slug
       
        
    );

    $posts = new WP_Query($args);
    
    $data = [];
    $i=0;

    foreach($posts->posts as $post){
        $data[$i]['id'] = $post->ID;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['description'] = $post->post_content;
        $i++;

    }

    return $data;
}





add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_project_by_name(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_sub_project_by_name'


    ]);

});

///////////////////////////////////////////////



/////// get gallery images by slug regardless of post type///////

function get_gallery_images(WP_REST_Request $request){

    $sub_project_slug = $request['slug'];

    $args = array(
        'numberposts' => 1,
        'post_type' => array('project_gallery', 'sub_project_gallery'),
        'name' => $sub_project_slug
       
        
    );

    $posts = new WP_Query($args);
    
    $data = [];
    $images = [];
    $i=0;

    foreach($posts->posts as $post){

        $x= 0;


        $imageids= get_post_meta($post->ID, 'gallery', true);

        foreach($imageids as $imageid){
            $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
            $images[$x]['title']= get_the_title($imageid);
            $images[$x]['caption']=wp_get_attachment_caption($imageid);
            
            $x++;
        }



        $data[$i]['id'] = $post->ID;
        $data[$i]['slug'] = $post->post_name;
        $data[$i]['title'] = $post->post_title;
        $data[$i]['images'] = $images;
        
        
        $i++;

    }

    return $data;
}



add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'gallery_images(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_gallery_images'


    ]);

});




///////////////////////////////////////////////////////////////////
