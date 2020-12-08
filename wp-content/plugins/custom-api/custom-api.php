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

    // $slug = $request['slug'];

    // $args = array(
    //     'numberposts' => -1,
    //     'post_type' => 'project_gallery',
    //     'tax_query' => array(
    //         array(
    //             'taxonomy' => 'gallery_project',
    //             'field'    => 'slug',
    //             'terms'    => $slug,
    //         ),
    //     ),
    // );

    // $posts = new WP_Query($args);

    // $data = [];
    // $i=0;

    // foreach($posts->posts as $post){

    //     $x=0;

    //     $images =[];


    //     $data[$i]['id'] = $post->ID;
    //     $data[$i]['title'] = $post->post_title;
    //     $data[$i]['gallery_slug'] = $post->post_name;
        
    //     $imageids= get_post_meta($post->ID, 'images', true);

    //     foreach($imageids as $imageid){
    //         $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
    //         $images[$x]['title']= get_the_title($imageid);
    //         $images[$x]['caption']=wp_get_attachment_caption($imageid);
            
    //         $x++;
    //     }

    //     $data[$i]['images']=$images;
        
    //     $thumbnail = get_post_meta($post->ID, 'thumbnail', false );

    //     $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

    //     $i++;

    // }

    // return $data;

    $slug = $request['slug'];

    $args = array(
        'numberposts' => -1,
        'post_type' => 'project_gallery',
        
        
        
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

    register_rest_route('custom-api/v1', 'project_galleries(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_galleries'


    ]);

});



//////////////////////////////

/////// get sub projects filter by slug ///////////


// function get_sub_projects_by_slug(WP_REST_Request $request){

//     $slug = $request['slug'];

//     $args = array(
//         'numberposts' => -1,
//         'post_type' => 'sub_projects',
//         // 'tax_query' => array(
//         //     array(
//         //         'taxonomy' => 'gallery_project',
//         //         'field'    => 'slug',
//         //         'terms'    => $slug,
//         //     ),
//         // ),
        
//     );
    

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $i=0;
    

//     foreach($posts->posts as $post){

        
//         $parent_project_id = get_post_meta($post->ID, 'parent_project', true)[0];

//         if(get_post($parent_project_id)->post_name === $slug){
//             $data[$i]['id'] = $post->ID;
//             $data[$i]['slug'] = $post->post_name;
//             $data[$i]['title'] = $post->post_title;
//             $data[$i]['description'] = $post->post_content;
            
//         }

//         $i++;
        

//     }

//     return $data;
// }





// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'sub_projects(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_sub_projects_by_slug'


//     ]);

// });

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

            $images[$x]['id'] = $imageid;
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



/////////////////////// get nav items  /////////////////////////////////

function get_nav_items(){


    $args = array(
        'numberposts' => -1,
        'post_type' => array('project', 'work' ),
        
       
        
    );

    $posts = new WP_Query($args);

    $works = [];
    $projects = [];
    
    $data = [];
    
    $project_counter=0;
    $work_counter=0;

    foreach($posts->posts as $post){
        if($post->post_type === 'project' ){
            
           $projects[$project_counter]['id'] = $post->ID;
           $projects[$project_counter]['title'] = $post->post_title;
           $projects[$project_counter]['slug'] = $post->post_name;

           $project_counter++;
        }

        if($post->post_type === 'work'){

            $works[$work_counter]['id'] = $post->ID;
            $works[$work_counter]['title'] = $post->post_title;
            $works[$work_counter]['slug'] = $post->post_name;

            $work_counter++;

        }


        else null;



        

        
    }

    $data[0]['projects'] = $projects;
    $data[1]['works'] = $works;





    return $data;



}




add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'get_nav_items', [

        'methods'  => 'GET',
        'callback' => 'get_nav_items'


    ]);

});

////////////////////////////////////////////////////////////////////////







function projects(WP_REST_Request $request){

    $post_type = $request['post_type'];
    $slug = $request['slug'];


    $args = array(
        'numberposts' => -1,
        'post_type' => $post_type,
        'slug' => $slug
        
       
        
    );

    $posts = new WP_Query($args);
    $data=[];
    $x=0;

   


    foreach($posts->posts as $post){

        $meta = get_post_meta($post->ID, false );
        // $sub_projects=[];
        // $i=0;

        

        $data[$x]['id'] = $post->ID;
        $data[$x]['project_title'] = $post->post_title;
        $data[$x]['featured_image'] = get_image_src($meta['featured_image'][0]);
        $data[$x]['project_description'] = $meta['description'][0];
        

        // if(have_rows('sub_project', $post->ID)):

            
           
        //     while(have_rows('sub_project', $post->ID)) : the_row();
        //         $sub_projects[$i]['title'] = get_sub_field('sub_project_title');
        //         $sub_projects[$i]['description'] = get_sub_field('sub_project_description');
        //         $i++;

        //     endwhile;
            

        // else:
            
        // endif;

        // $data[$x]['sub_projects']= $sub_projects;
           

        

        // // $data[$x]['project_description'] = get_post_meta( $post->ID, 'description', false)[0];

        // $data[$x]['meta']= get_post_meta( $post->ID, false);


        $x++;

        



    }

   




    return $data;



}




add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'get_(?P<post_type>.*)(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'projects'


    ]);

});




///////////////////////////////////////////////////////////////////////////////////

function sub_projects(WP_REST_Request $request){

    $slug= $request['slug'];
    $args = array(
        'numberposts' => -1,
        'post_type' => 'sub_projects',
        
        
       
        
    );

    function get_image_src($id){

        return wp_get_attachment_image_src($id, $size='large')[0];
 
 
    };

    function handle_images($id){

        $image= null;

        $image['src']=get_image_src($id);
        $meta=get_post_meta( $id );
        $image['caption']=[
            $meta['image_caption_line_1'][0], 
            $meta['image_caption_line_2'][0], 
            $meta['image_caption_line_3'][0],
            $meta['image_caption_line_4'][0] 
        ];

        return $image;



    }


    

    $posts = new WP_Query($args);
    $data=[];
    $i=0;

    foreach($posts->posts as $post){
        
        $galleries=[];
        $x=0;
        $parent_project_id= get_post_meta($post->ID, 'parent_project', true)[0];

        $parent_project= get_post($parent_project_id)->post_name;

        if($parent_project === $slug){

            $data[$i]['ID']=$post->ID;
            $data[$i]['slug']=$post->post_name;
            $data[$i]['title']=$post->post_title;
            $data[$i]['description']= get_post_meta($post->ID, 'sub_project_description', true);
            //////////////////////////////////////

            if(have_rows('sub_project_galleries', $post->ID)):

            
           
                while(have_rows('sub_project_galleries', $post->ID)) : the_row();
                    $galleries[$x]['title'] = get_sub_field('gallery_title');

                    $image_array= get_sub_field('gallery_images');
                    $galleries[$x]['images']= [];
                    foreach($image_array as $id){
                        array_push($galleries[$x]['images'],handle_images($id) );
                    }


                    
                    $galleries[$x]['thumbnail']=get_image_src(get_sub_field('gallery_thumbnail'));

                    
                    $x++;

                endwhile;
            

                else:

                    
            
            endif;

            $data[$i]['galleries']=$galleries;





            //////////////////////////////////////


            // $data[$i]['post_data']=$post;

            // $data[$i]['meta']=get_post_meta( $post->ID);

            


            // $data[$i]['project'] = $parent_project;
            // $data[$i]['slug']=$slug;
        }

        
        

        

        


        // if(get_post($parent_project_id)->post_name === $slug){

        //     // $data[$i]['id'] = $post->ID;
        //     // $data[$i]['gallery_slug'] = $post->post_name;
        //     // $data[$i]['title'] = $post->post_title;
            
        //     // $imageids= get_post_meta($post->ID, 'gallery', true);
        //     $data[$i]['sub_project']=$post;

        //     // foreach($imageids as $imageid){
        //     //     $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
        //     //     $images[$x]['title']= get_the_title($imageid);
        //     //     $images[$x]['caption']=wp_get_attachment_caption($imageid);
                
        //     //     $x++;
        //     // }


            
        // //     // $data[$i]['images']=$images;
        // //     // $thumbnail = get_post_meta($post->ID, 'thumbnail', false );
        // //     // $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

        // // }

        // $data[$i]['post']=$post;
        
        $i++;

    }


    
    $meta = get_post_meta( $posts->post->ID , 'parent_projects');

    return $data;


}



add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_projects(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'sub_projects'


    ]);

});