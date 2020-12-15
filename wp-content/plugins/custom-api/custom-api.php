<?php

/**
 * Plugin Name: Custom API
 * Plugin URI:
 * Description: custom api
 * Version: 1.0
 * Author: zesty lemon
 * Author URI: 
 */

 
 
//  //// get projects ////

// function get_projects(WP_REST_Request $request){

//     $slug = $request['slug'];

//     $args = array(
//         'numberposts' => -1,
//         'post_type' => 'project',
//         'name' => $slug,
        
//     );

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $i=0;

//     foreach($posts->posts as $post){
//         $data[$i]['id'] = $post->ID;
//         $data[$i]['slug'] = $post->post_name;
//         $data[$i]['title'] = $post->post_title;
//         $data[$i]['description'] = get_post_meta( $post->ID, 'description', true);
//         $i++;

//     }

//     return $data;
// }


// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'projects(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_projects'


//     ]);

// }); 


// ///////////////////////


// //////get project galleries /////

// function get_galleries(WP_REST_Request $request){

//     // $slug = $request['slug'];

//     // $args = array(
//     //     'numberposts' => -1,
//     //     'post_type' => 'project_gallery',
//     //     'tax_query' => array(
//     //         array(
//     //             'taxonomy' => 'gallery_project',
//     //             'field'    => 'slug',
//     //             'terms'    => $slug,
//     //         ),
//     //     ),
//     // );

//     // $posts = new WP_Query($args);

//     // $data = [];
//     // $i=0;

//     // foreach($posts->posts as $post){

//     //     $x=0;

//     //     $images =[];


//     //     $data[$i]['id'] = $post->ID;
//     //     $data[$i]['title'] = $post->post_title;
//     //     $data[$i]['gallery_slug'] = $post->post_name;
        
//     //     $imageids= get_post_meta($post->ID, 'images', true);

//     //     foreach($imageids as $imageid){
//     //         $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
//     //         $images[$x]['title']= get_the_title($imageid);
//     //         $images[$x]['caption']=wp_get_attachment_caption($imageid);
            
//     //         $x++;
//     //     }

//     //     $data[$i]['images']=$images;
        
//     //     $thumbnail = get_post_meta($post->ID, 'thumbnail', false );

//     //     $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

//     //     $i++;

//     // }

//     // return $data;

//     $slug = $request['slug'];

//     $args = array(
//         'numberposts' => -1,
//         'post_type' => 'project_gallery',
        
        
        
//     );

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $i=0;
    
//     $images = [];

//     foreach($posts->posts as $post){
        
        
//         $x=0;
//         $parent_project_id = get_post_meta($post->ID, 'parent_project', true)[0];
//         // $parent_project_slug = get_post($parent_project_id)->post_name;

//         if(get_post($parent_project_id)->post_name === $slug){

//             $data[$i]['id'] = $post->ID;
//             $data[$i]['gallery_slug'] = $post->post_name;
//             $data[$i]['title'] = $post->post_title;
            
//             $imageids= get_post_meta($post->ID, 'gallery', true);

//             foreach($imageids as $imageid){
//                 $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
//                 $images[$x]['title']= get_the_title($imageid);
//                 $images[$x]['caption']=wp_get_attachment_caption($imageid);
                
//                 $x++;
//             }


            
//             $data[$i]['images']=$images;
//             $thumbnail = get_post_meta($post->ID, 'thumbnail', false );
//             $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

//         }
        
//         $i++;

//     }

//     return $data;




// }


// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'project_galleries(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_galleries'


//     ]);

// });



// //////////////////////////////

// /////// get sub projects filter by slug ///////////


// // function get_sub_projects_by_slug(WP_REST_Request $request){

// //     $slug = $request['slug'];

// //     $args = array(
// //         'numberposts' => -1,
// //         'post_type' => 'sub_projects',
// //         // 'tax_query' => array(
// //         //     array(
// //         //         'taxonomy' => 'gallery_project',
// //         //         'field'    => 'slug',
// //         //         'terms'    => $slug,
// //         //     ),
// //         // ),
        
// //     );
    

// //     $posts = new WP_Query($args);
    
// //     $data = [];
// //     $i=0;
    

// //     foreach($posts->posts as $post){

        
// //         $parent_project_id = get_post_meta($post->ID, 'parent_project', true)[0];

// //         if(get_post($parent_project_id)->post_name === $slug){
// //             $data[$i]['id'] = $post->ID;
// //             $data[$i]['slug'] = $post->post_name;
// //             $data[$i]['title'] = $post->post_title;
// //             $data[$i]['description'] = $post->post_content;
            
// //         }

// //         $i++;
        

// //     }

// //     return $data;
// // }





// // add_action('rest_api_init', function(){

// //     register_rest_route('custom-api/v1', 'sub_projects(?P<slug>.*)', [

// //         'methods'  => 'GET',
// //         'callback' => 'get_sub_projects_by_slug'


// //     ]);

// // });

// //////////////////////////////////



// ///////// get sub project galleries /////////



// function get_sub_project_galleries(WP_REST_Request $request){

//     $slug = $request['slug'];

//     $args = array(
//         'numberposts' => -1,
//         'post_type' => 'sub_project_gallery',
        
        
        
//     );

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $i=0;
    
//     $images = [];

//     foreach($posts->posts as $post){
        
        
//         $x=0;
//         $parent_project_id = get_post_meta($post->ID, 'parent_project', true)[0];
//         // $parent_project_slug = get_post($parent_project_id)->post_name;

//         if(get_post($parent_project_id)->post_name === $slug){

//             $data[$i]['id'] = $post->ID;
//             $data[$i]['gallery_slug'] = $post->post_name;
//             $data[$i]['title'] = $post->post_title;
            
//             $imageids= get_post_meta($post->ID, 'gallery', true);

//             foreach($imageids as $imageid){
//                 $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
//                 $images[$x]['title']= get_the_title($imageid);
//                 $images[$x]['caption']=wp_get_attachment_caption($imageid);
                
//                 $x++;
//             }


            
//             $data[$i]['images']=$images;
//             $thumbnail = get_post_meta($post->ID, 'thumbnail', false );
//             $data[$i]['thumbnail'] = wp_get_attachment_image_src($thumbnail[0], $size='medium')[0];

//         }
        
//         $i++;

//     }

//     return $data;
// }







// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'sub_project_galleries(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_sub_project_galleries'


//     ]);

// });


// ///////////////////////////////////


// ///////// get sub projects by id  /////////

// function get_sub_project_by_name(WP_REST_Request $request){

//     $sub_project_slug = $request['slug'];

//     $args = array(
//         'numberposts' => 1,
//         'post_type' => 'sub_projects',
//         'name' => $sub_project_slug
       
        
//     );

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $i=0;

//     foreach($posts->posts as $post){
//         $data[$i]['id'] = $post->ID;
//         $data[$i]['slug'] = $post->post_name;
//         $data[$i]['title'] = $post->post_title;
//         $data[$i]['description'] = $post->post_content;
//         $i++;

//     }

//     return $data;
// }





// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'sub_project_by_name(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_sub_project_by_name'


//     ]);

// });

// ///////////////////////////////////////////////



// /////// get gallery images by slug regardless of post type///////

// function get_gallery_images(WP_REST_Request $request){

//     $sub_project_slug = $request['slug'];

//     $args = array(
//         'numberposts' => 1,
//         'post_type' => array('project_gallery', 'sub_project_gallery'),
//         'name' => $sub_project_slug
       
        
//     );

//     $posts = new WP_Query($args);
    
//     $data = [];
//     $images = [];
//     $i=0;

//     foreach($posts->posts as $post){

//         $x= 0;


//         $imageids= get_post_meta($post->ID, 'gallery', true);

//         foreach($imageids as $imageid){

//             $images[$x]['id'] = $imageid;
//             $images[$x]['src'] = wp_get_attachment_image_src($imageid, $size='medium')[0];
//             $images[$x]['title']= get_the_title($imageid);
//             $images[$x]['caption']=wp_get_attachment_caption($imageid);
            
//             $x++;
//         }



//         $data[$i]['id'] = $post->ID;
//         $data[$i]['slug'] = $post->post_name;
//         $data[$i]['title'] = $post->post_title;
//         $data[$i]['images'] = $images;
        
        
        
//         $i++;

//     }

//     return $data;
// }



// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'gallery_images(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_gallery_images'


//     ]);

// });







function get_sub_for_nav($type, $slug){
   
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        
    );
    $posts = new WP_Query($args);
    $data=[];
    
    foreach($posts->posts as $post){
        
        $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
        $parent= get_post($parent_id)->post_name;
        if($parent === $slug){

            $post_object = new stdClass();
            $galleries = [];
            $post_object->id = $post->ID;
            $post_object->slug = $post->post_name;
            $post_object->title = $post->post_title;
           
           
            if(have_rows("sub_{$type}_galleries", $post->ID)):
                
                while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();
                    $galleries_object = new stdClass();
                    $galleries_object->title = get_sub_field('gallery_title');
                    
                    array_push($galleries, $galleries_object);

                endwhile;
            endif;
            $post_object->galleries=$galleries;
            array_push($data, $post_object);
        }
    }
    return $data;
    


}



// /////////////////////// get nav items  /////////////////////////////////

function get_nav_items(){


    $args = array(
        'numberposts' => -1,
        'post_type' => array('projects', 'works' ),
        
       
        
    );

    $posts = new WP_Query($args);

    $works = [];
    $projects = [];
    
    $data = [];
    
    $project_counter=0;
    $work_counter=0;

    

    foreach($posts->posts as $post){
        if($post->post_type === 'projects' ){

            
            
          
           $projects[$project_counter]['id'] = $post->ID;
           $projects[$project_counter]['title'] = $post->post_title;
           $projects[$project_counter]['slug'] = $post->post_name;
           $projects[$project_counter]["subs"] =get_sub_for_nav('projects', $post->post_name);
           if(check_sub_count($post->post_name, 'projects')==2){
                $projects[$project_counter]['gallery']=true;
            }elseif(check_sub_count($post->post_name, 'projects' )>2){
                $projects[$project_counter]['gallery']=false;
            }else{
                 $projects[$project_counter]['gallery']=false;
            }

           $project_counter++;
        }

        if($post->post_type === 'works'){
            

            $works[$work_counter]['id'] = $post->ID;
            $works[$work_counter]['title'] = $post->post_title;
            $works[$work_counter]['slug'] = $post->post_name;
            $works[$work_counter]["subs"] =get_sub_for_nav('works', $post->post_name);
            if(check_sub_count($post->post_name, 'works')==2){
                $works[$work_counter]['gallery']=true;
            }elseif(check_sub_count($post->post_name, 'works' )>2){
             $works[$work_counter]['gallery']=false;
            }else{
             $works[$work_counter]['gallery']=false;
            }

            $work_counter++;

        }


        else null;



        

        
    }

    $data['projects'] = $projects;
    $data['works'] = $works;





    return $data;



}




add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'get_nav_items', [

        'methods'  => 'GET',
        'callback' => 'get_nav_items'


    ]);

});

//////////////////////////////////////////////////////////////////////



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


function check_sub_count($slug, $type){
    
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        
    );

   

    

    $posts = new WP_Query($args);
    
    $i=0;
    $counter=0;

    foreach($posts->posts as $post){
        
        $galleries=[];
        $x=0;
        $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
        $parent= get_post($parent_id)->post_name;

        if($parent === $slug){

            
           $counter++;

            if(have_rows("sub_{$type}_galleries", $post->ID)):

            
           
                while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();
                   $counter++;

                    
                    $x++;

                endwhile;
            

                else:

                    
            
            endif;

            
        }
        $i++;

    }
    return $counter;

}



function projects(WP_REST_Request $request){

    $type = $request['post_type'];
    


    $args = array(
        'numberposts' => -1,
        'post_type' => $type
        
        
       
        
    );

    $posts = new WP_Query($args);
    $data=[];
    $x=0;

   foreach($posts->posts as $post){

        

       if(check_sub_count($post->post_name, $type)==2){
           $data[$x]['gallery']=true;
       }elseif(check_sub_count($post->post_name, $type)>2){
        $data[$x]['gallery']=false;
       }else{
        $data[$x]['gallery']=false;
       }
       
       

       $post_meta=get_post_meta($post->ID);

       $data[$x]['id']=$post->ID;
       $data[$x]['slug']=$post->post_name;
       $data[$x]['title']=$post->post_title;
       $data[$x]['description']=$post_meta['description'][0];
       $data[$x]['featured_image']=handle_images($post_meta['featured_image'][0]);
       
       $x++;
   }
    
    return $data;
}

add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'get_(?P<post_type>.*)', [

        'methods'  => 'GET',
        'callback' => 'projects'
    ]);

});
////////////////////////////////////////////////////////////////////////////////////

function get_sub_gallery(WP_REST_Request $request){
    
    $type=$request['type'];
    $slug=$request['slug'];
    $gallery_slug=$request['gallery_slug'];
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        
    );
    $posts = new WP_Query($args);

    $gallery_object = new stdClass();

    

    foreach($posts->posts as $post){

        
        
        $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
        $parent= get_post($parent_id)->post_name;
        if($parent === $slug){

            

            
            
            
           
            if(have_rows("sub_{$type}_galleries", $post->ID)):
                
                while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();

                    $row_title = get_sub_field('gallery_title');
                    $row_slug = create_slug($row_title);
                    

                    if( $row_slug === $gallery_slug){

                       


                        
                        $gallery_object = new stdClass();
                        $gallery_object->gallery_slug = create_slug(get_sub_field('gallery_title'));
                        $gallery_object->title = get_sub_field('gallery_title');
                        $image_array= get_sub_field('gallery_images');
                        $gallery_object->images= [];
                        foreach($image_array as $id){
                            array_push($gallery_object->images,handle_images($id) );
                        }
                        $gallery_object->thumbnail=get_image_src(get_sub_field('gallery_thumbnail'));
                        

                    }
                    
                    
                   

                endwhile;
            endif;

            
            
        }
    }
    return $gallery_object;




    
}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'gallery_images(?P<type>.*)(?P<slug>.*)(?P<gallery_slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_sub_gallery'
    ]);

});


///////////////////////////////////////////////////////////////////////////////////
function create_slug($text)
{
  // replace non letter or digits by -
  $text = preg_replace('~[^\pL\d]+~u', '-', $text);

  // transliterate
  $text = iconv('utf-8', 'us-ascii//TRANSLIT', $text);

  // remove unwanted characters
  $text = preg_replace('~[^-\w]+~', '', $text);

  // trim
  $text = trim($text, '-');

  // remove duplicate -
  $text = preg_replace('~-+~', '-', $text);

  // lowercase
  $text = strtolower($text);

  if (empty($text)) {
    return 'n-a';
  }

  return $text;
}
///////////////////////////////////////////////////////////////////////////////////

function get_subs(WP_REST_Request $request){

    $slug= $request['slug'];
    $type=$request['type'];
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        
    );
    $posts = new WP_Query($args);
    $data=[];
    
    foreach($posts->posts as $post){
        
        $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
        $parent= get_post($parent_id)->post_name;
        if($parent === $slug){

            $post_object = new stdClass();
            $galleries = [];
            $post_object->id = $post->ID;
            $post_object->slug = $post->post_name;
            $post_object->title = $post->post_title;
            $post_object->description = get_post_meta($post->ID, "sub_{$type}_description", true);
           
            if(have_rows("sub_{$type}_galleries", $post->ID)):
                
                while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();
                    $galleries_object = new stdClass();
                    $galleries_object->gallery_slug = create_slug(get_sub_field('gallery_title'));
                    $galleries_object->title = get_sub_field('gallery_title');
                    $image_array= get_sub_field('gallery_images');
                    $galleries_object->images= [];
                    foreach($image_array as $id){
                        array_push($galleries_object->images,handle_images($id) );
                    }
                    $galleries_object->thumbnail=get_image_src(get_sub_field('gallery_thumbnail'));
                    array_push($galleries, $galleries_object);

                endwhile;
            endif;
            $post_object->galleries=$galleries;
            array_push($data, $post_object);
        }
    }
    return $data;
}

add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_(?P<type>.*)(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_subs'
    ]);
});









