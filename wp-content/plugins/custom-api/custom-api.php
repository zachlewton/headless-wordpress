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

// function get_nav_items(){


//     $args = array(
//         'numberposts' => -1,
//         'post_type' => array('projects', 'works', 'info' ),
        
       
        
//     );

//     $posts = new WP_Query($args);

//     $works = [];
//     $projects = [];
//     $info=[];
    
//     $data = [];
    
//     $project_counter=0;
//     $work_counter=0;
//     $info_counter=0;

    

//     foreach($posts->posts as $post){
//         if($post->post_type === 'projects' ){

            
            
          
//            $projects[$project_counter]['id'] = $post->ID;
//            $projects[$project_counter]['title'] = $post->post_title;
//            $projects[$project_counter]['slug'] = $post->post_name;
//            $projects[$project_counter]["subs"] =get_sub_for_nav('projects', $post->post_name);
//            if(check_sub_count($post->post_name, 'projects')==2){
//                 $projects[$project_counter]['gallery']=true;
//             }elseif(check_sub_count($post->post_name, 'projects' )>2){
//                 $projects[$project_counter]['gallery']=false;
//             }else{
//                  $projects[$project_counter]['gallery']=false;
//             }

//            $project_counter++;
//         }

//         if($post->post_type === 'works'){
            

//             $works[$work_counter]['id'] = $post->ID;
//             $works[$work_counter]['title'] = $post->post_title;
//             $works[$work_counter]['slug'] = $post->post_name;
//             $works[$work_counter]["subs"] =get_sub_for_nav('works', $post->post_name);
//             if(check_sub_count($post->post_name, 'works')==2){
//                 $works[$work_counter]['gallery']=true;
//             }elseif(check_sub_count($post->post_name, 'works' )>2){
//              $works[$work_counter]['gallery']=false;
//             }else{
//              $works[$work_counter]['gallery']=false;
//             }

//             $work_counter++;

//         }

//         if($post->post_type === 'info'){
//             $info[$info_counter]['id']= $post->ID;
//             $info[$info_counter]['title']= $post->post_title;
//             $info[$info_counter]['slug']= $post->post_name;


//             $info_counter++;

//         }


//         else null;



        

        
//     }

//     $data['projects'] = $projects;
//     $data['works'] = $works;
//     $data['info']=$info;





//     return $data;



// }



function get_nav_items(){


    $args = array(
        'numberposts' => -1,
        'post_type' => array('projects', 'works', 'info' ),
        
       
        
    );

    $posts = new WP_Query($args);
    $data = new stdClass();

    $works = [];
    $projects = [];
    $info=[];

    foreach($posts->posts as $post){

       $post_object = new stdClass();

       $post_object->id = $post->ID;
       $post_object->slug = $post->post_name;
       $post_object->title = $post->post_title;
       
       $meta = get_post_meta($post->ID);

        if($post->post_type == 'projects'){

           if($meta['display_options'][0] == 'sub projects'  ){
               $subs = get_field('subs', $post->ID);
               if($subs){
                   
                    $subs_array =[];
                    foreach($subs as $sub){
                        $sub_object = new stdClass();
                        $sub_object->ID = $sub->ID;
                        $sub_object->title = $sub->post_title;
                        $sub_object->slug = $sub->post_name;

                        if(get_post_meta($sub->ID, "display_options")[0] == 'intro galleries'){

                            $sub_galleries = [];

                         

                            if(have_rows('sub_galleries', $sub->ID)){

                                // $sub_object->has_rows="true";
                                while(have_rows("sub_galleries", $sub->ID)) : the_row();

                                    $gallery = new stdClass();

                                    $gallery->title= get_sub_field('gallery_title');
                                    $gallery->slug=  create_slug(get_sub_field('gallery_title'));


                                    array_push($sub_galleries, $gallery );

                  

                                endwhile;

                                $sub_object->galleries= $sub_galleries;

                            }




                        }
                        


                        array_push($subs_array, $sub_object);


                    }
                    $post_object->subs = $subs_array;
               }



               
           }

            array_push($projects, $post_object);
            
        }
        elseif($post->post_type == 'works'){

            if($meta['display_options'][0] == 'sub works'  ){

                // $post_object->has_children = true;


                $subs = get_field('subs', $post->ID);
                if($subs){

                    $post_object->subs= true;
                    
                     $subs_array =[];
                     foreach($subs as $sub){
                         $sub_object = new stdClass();
                         $sub_object->ID = $sub->ID;
                         $sub_object->title = $sub->post_title;
                         $sub_object->slug = $sub->post_name;
 
                         
 
                        
 
                         if(get_post_meta($sub->ID, "display_options")[0] == 'intro galleries'){
 
                             $sub_galleries = [];
 
                          
 
                             if(have_rows('sub_galleries', $sub->ID)){
 
                                //  $sub_object->has_rows="true";
                                 while(have_rows("sub_galleries", $sub->ID)) : the_row();
 
                                     $gallery = new stdClass();
 
                                     $gallery->title= get_sub_field('gallery_title');
                                     $gallery->slug=  create_slug(get_sub_field('gallery_title'));
 
 
                                     array_push($sub_galleries, $gallery );
 
                   
 
                                 endwhile;
 
                                 $sub_object->galleries= $sub_galleries;
 
                             }
 
 
 
 
                         }
                         
 
 
                         array_push($subs_array, $sub_object);
 
 
                     }
                     $post_object->subs = $subs_array;
                }
 
 
 
                
            }
            array_push($works, $post_object);
        }
        elseif($post->post_type == 'info'){
            array_push($info, $post_object);
        }

    }

    

    $data->projects = $projects;
    $data->works = $works;
    $data->info = $info;



    return $data;



}




add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'get_nav_items', [

        'methods'  => 'GET',
        'callback' => 'get_nav_items'


    ]);

});

//////////////////////////////////////////////////////////////////////




///////////////////////////////////////



function get_image_src($id){
        
    return wp_get_attachment_image_src($id, $size='large')[0];
};


function handle_images($id){

    $image= null;

    $image['id']=$id;
    $image['src']=get_image_src($id);
    $meta=get_post_meta( $id );
    $image['caption']=[
        $meta['image_caption_line_1'][0], 
        $meta['image_caption_line_2'][0], 
        $meta['image_caption_line_3'][0],
        $meta['image_caption_line_4'][0] 
    ];
    $image['main_caption']=$meta['main_caption'][0];

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


        
    
       
       

       $post_meta=get_post_meta($post->ID);

       

    //    if($post_meta['display_type'] == `sub_$type`){
    //        $data[$x]['subs'] = true;
    //    }

       $data[$x]['id']=$post->ID;
       $data[$x]['slug']=$post->post_name;
       $data[$x]['title']=$post->post_title;

       if($post_meta['display_options'][0] == "sub {$type}"){
            $data[$x]['featured_image']=wp_get_attachment_image_src($post_meta['featured_image'][0], 'large')[0];
       }else{
           if($post_meta['gallery']){
               
                $gallery_blocks =get_field('gallery', $post->ID);
                $featured_image_id = null;
            
            
                foreach($gallery_blocks as $block){
                    if($block['type'] == 'image block'){
                        $featured_image_id = $block['image_block'][0];
                        break;
                    }
                
                }

                $featured_image = wp_get_attachment_image_src($featured_image_id, 'large')[0];
                $data[$x]['featured_image'] = $featured_image;
           }elseif($post_meta['display_options'][0] == "video"){
            $data[$x]['featured_image']=wp_get_attachment_image_src($post_meta['featured_image'][0], 'large')[0];
           }
           else null;
       }

      
       $data[$x]['display_type'] = $post_meta['display_options'][0];
       
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

// function get_sub_gallery(WP_REST_Request $request){
    
//     $type=$request['type'];
//     $slug=$request['slug'];
//     $gallery_slug=$request['gallery_slug'];
//     $args = array(
//         'numberposts' => -1,
//         'post_type' => "sub_{$type}",
        
//     );
//     $posts = new WP_Query($args);

//     $gallery_object = new stdClass();

    

//     foreach($posts->posts as $post){

        
        
//         $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
//         $parent= get_post($parent_id)->post_name;
//         if($parent === $slug){

            

            
            
            
           
//             if(have_rows("sub_{$type}_galleries", $post->ID)):
                
//                 while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();

//                     $row_title = get_sub_field('gallery_title');
//                     $row_slug = create_slug($row_title);
                    

//                     if( $row_slug === $gallery_slug){

                       


                        
//                         $gallery_object = new stdClass();
//                         $gallery_object->gallery_slug = create_slug(get_sub_field('gallery_title'));
//                         $gallery_object->title = get_sub_field('gallery_title');
//                         $image_array= get_sub_field('gallery_images');
//                         $gallery_object->images= [];
//                         foreach($image_array as $id){
//                             array_push($gallery_object->images,handle_images($id) );
//                         }
//                         $gallery_object->thumbnail=get_image_src(get_sub_field('gallery_thumbnail'));
                        

//                     }
                    
                    
                   

//                 endwhile;
//             endif;

            
            
//         }
//     }
//     return $gallery_object;




    
// }


// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'gallery_images(?P<type>.*)(?P<slug>.*)(?P<gallery_slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_sub_gallery'
//     ]);

// });

function get_sub_gallery(WP_REST_Request $request){
    
    $type=$request['type'];
    $slug=$request['slug'];
    $gallery_slug=$request['gallery_slug'];
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        'name' => $slug,
        
    );
    $sub = new WP_Query($args);
    $sub= $sub->post;

    $gallery_object = new stdClass();

    // $gallery_object->ID = $sub->ID;
    // $gallery_object->slug= $sub->post_name;
    // $gallery_object->title = $sub->post_title;

    $sub_galleries = get_field('sub_galleries', $sub->ID);

    foreach($sub_galleries as $gallery){
        if(create_slug($gallery['gallery_title']) == $gallery_slug){
            
            $gallery_object->slug= create_slug($gallery['gallery_title']);
            $gallery_object->title = $gallery['gallery_title'];
            $gallery_object->display_type= $gallery['display_type'];
            
            if(strlen($gallery['gallery_description']) > 0){
                $gallery_object->description = $gallery['gallery_description'];
            }

            if($gallery['display_type'] == 'video'){
                $gallery_object->video_link= $gallery['video_link']['video_link'];
            }else{
                $images = [];

                foreach($gallery['images'] as $block){

                    $block_object =  new stdClass();

                    if($block['type'] == 'video'){
                        $block_object->block_type = 'video';
                        $block_object->video_title = $block['video_title'];
                        $block_object->video_link = $block['video_link'];

                        

                    }else{

                        $image_block_array = [];

                        $block_object->block_type = 'image_block';

                        foreach($block['image_block'] as $image){
                            array_push($image_block_array, handle_images($image));

                        }

                        $block_object->image_block = $image_block_array;
                        
                    }

                    array_push($images, $block_object);
                }
                

                $gallery_object->images= $images;
            }
            
            
            
           

        }else null;
    }

    

    
    return $gallery_object;




    
}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'gallery_images(?P<type>.*)(?P<slug>.*)(?P<gallery_slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_sub_gallery'
    ]);

});


////////////////////////////////////////////////////////////////////////////////////

// function ig(WP_REST_Request $request){

//     $slug= $request['slug'];
//     $type=$request['type'];
//     $gallery_slug=$request['gallery_slug'];
//     $args = array(
//         'numberposts' => -1,
//         'post_type' => "sub_{$type}",
        
//     );
//     $posts = new WP_Query($args);
//     $data=[];
    
//     foreach($posts->posts as $post){
        
//         $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
//         $parent= get_post($parent_id)->post_name;
//         if($parent === $slug){
//             if($post->post_name === $gallery_slug){
//                 $post_object = new stdClass();
//                 $galleries = [];
//                 $post_object->id = $post->ID;
//                 $post_object->slug = $post->post_name;
//                 $post_object->title = $post->post_title;
//                 $post_object->description = get_post_meta($post->ID, "sub_{$type}_description", true);
            
//                 if(have_rows("sub_{$type}_galleries", $post->ID)):
                    
//                     while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();
//                         $galleries_object = new stdClass();
//                         $galleries_object->gallery_slug = create_slug(get_sub_field('gallery_title'));
//                         $galleries_object->title = get_sub_field('gallery_title');
//                         $image_array= get_sub_field('gallery_images');
//                         $galleries_object->images= [];
//                         foreach($image_array as $id){
//                             array_push($galleries_object->images,handle_images($id) );
//                         }
//                         $galleries_object->thumbnail=get_image_src(get_sub_field('gallery_thumbnail'));
//                         array_push($galleries, $galleries_object);

//                     endwhile;
//                 endif;
//                 $post_object->galleries=$galleries;
                
//             }

            
//         }
//     }
//     return $post_object;

    

// }


// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'ig(?P<type>.*)(?P<slug>.*)(?P<gallery_slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'ig'
//     ]);

// });

function ig(WP_REST_Request $request){

    $slug= $request['slug'];
    $type=$request['type'];
    $sub_slug=$request['sub_slug'];
    $args = array(
        'numberposts' => -1,
        'post_type' => "sub_{$type}",
        'name' => $sub_slug,
        
    );
    $sub = new WP_Query($args);
    $sub= $sub->post;
    $sub_meta= get_post_meta($sub->ID);

    

    $final_object = new stdClass();
    $final_object->id = $sub->ID;
    $final_object->slug =$sub->post_name;
    $final_object->title = $sub->post_title;
    if(strlen(
        $sub_meta['sub_description'][0])  > 0)
    $final_object->description = $sub_meta['sub_description'][0];

    $final_object->display_type = $sub_meta['display_options'][0];

    if($sub_meta['display_options'][0] == 'video'){
        $final_object->video_link = get_field('video', $sub->ID)['video_link'];

    }elseif($sub_meta['display_options'][0] == 'intro galleries'){
        $sub_galleries_array = get_field('sub_galleries', $sub->ID);

        $sub_galleries = [];

        foreach($sub_galleries_array as $sub_gallery){

            $sub_gallery_object = new stdClass();

            $sub_gallery_object->slug = create_slug($sub_gallery['gallery_title']) ;
            $sub_gallery_object->title = $sub_gallery['gallery_title'];
            $sub_gallery_object->display_type = $sub_gallery['display_type'];

            if($sub_gallery['display_type'] == 'video'){

                $sub_gallery_object->featured_image =  wp_get_attachment_image_src($sub_gallery['video_link']['featured_image'], 'large')[0]; 
               
                

            }else{

                $gallery_blocks = $sub_gallery['images'];
                $featured_image_id = null;
            
            
                foreach($gallery_blocks as $block){
                    if($block['type'] == 'image block'){
                        $featured_image_id = $block['image_block'][0];
                        break;
                    }
                
                }

                $featured_image = wp_get_attachment_image_src($featured_image_id, 'large')[0];
                $sub_gallery_object->featured_image = $featured_image;
                    
                }

            


            array_push($sub_galleries, $sub_gallery_object);
        }

            $final_object->sub_galleries=$sub_galleries;

    }elseif($sub_meta['gallery']){
        
        $gallery =[];
        $gallery_array = get_field('gallery', $sub->ID);
        foreach($gallery_array as $row){
            $image_object = new stdClass();
            $image_object->type = $row['type'];
            if($row['type'] == 'image block'){
                $image_array = [];
                foreach($row['image_block'] as $image){
                    array_push($image_array, handle_images($image));
                }
                $image_object->block = $image_array;
            }elseif($row['type'] == 'video'){
                $image_object->video_link = $row['video_link'];

            }


            array_push($gallery, $image_object);
        }
        $final_object->gallery = $gallery;

    }

    
    
    

    
    return $final_object;

    

}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'ig(?P<type>)(?P<slug>.*)(?P<sub_slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'ig'
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

// function get_subs(WP_REST_Request $request){

//     $slug= $request['slug'];
//     $type=$request['type'];
//     $args = array(
//         'numberposts' => -1,
//         'post_type' => "sub_{$type}",
        
//     );
//     $posts = new WP_Query($args);
//     $data=[];
//     $final_object= new stdClass();

    
//     foreach($posts->posts as $post){
        
//         $parent_id= get_post_meta($post->ID, "parent_{$type}", true)[0];
//         $parent= get_post($parent_id)->post_name;
//         if($parent === $slug){

//             $final_object->title= get_post($parent_id)->post_title;
//             $final_object->description = get_post_meta($parent_id, "description", true);
//             $subs_object = new stdClass();
//             $galleries = [];
//             $subs_object->id = $post->ID;
//             $subs_object->slug = $post->post_name;
//             $subs_object->title = $post->post_title;
// 			$featured_image = get_post_meta($post->ID, "sub_{$type}_featured_image", true);
//             $subs_object->featured_image = handle_images($featured_image);
//             // $subs_object->description = get_post_meta($post->ID, "sub_{$type}_description", true);
           
//             if(have_rows("sub_{$type}_galleries", $post->ID)):
                
//                 while(have_rows("sub_{$type}_galleries", $post->ID)) : the_row();
//                     $galleries_object = new stdClass();
//                     $galleries_object->gallery_slug = create_slug(get_sub_field('gallery_title'));
//                     $galleries_object->title = get_sub_field('gallery_title');
//                     $image_array= get_sub_field('gallery_images');
//                     $galleries_object->images= [];
//                     foreach($image_array as $id){
//                         array_push($galleries_object->images,handle_images($id) );
//                     }
//                     $galleries_object->thumbnail=get_image_src(get_sub_field('gallery_thumbnail'));
//                     array_push($galleries, $galleries_object);

//                 endwhile;
//             endif;
//             $subs_object->galleries=$galleries;
//             array_push($data, $subs_object);
//         }
//     }
//     $final_object->subs = $data;

//     return $final_object;
// }

// add_action('rest_api_init', function(){

//     register_rest_route('custom-api/v1', 'sub_(?P<type>.*)(?P<slug>.*)', [

//         'methods'  => 'GET',
//         'callback' => 'get_subs'
//     ]);
// });

function get_subs(WP_REST_Request $request){

    $slug= $request['slug'];
    $type=$request['type'];
    

    $args1 = array(
        
        'post_type' => "{$type}",
        'name' => $slug,
        
    );

    $parent = new WP_QUERY($args1);
    $parent = $parent->post;

    $final_object= new stdClass();

    $display_type = get_post_meta($parent->ID, 'display_options')[0];
    $final_object->title = $parent->post_title;

    if(strlen(get_post_meta($parent->ID, 'description')[0]) > 0 ){
        $final_object->description = get_post_meta($parent->ID, 'description')[0];
}



    $final_object->display_type = $display_type;

    if($display_type == "sub {$type}"){

        $subs = get_field("subs", $parent);

   

        if(count($subs) > 0){

            $posts =[];
            foreach($subs as $sub){

            
                array_push($posts, get_post($sub->ID));
        
            }

        }
        $subs_array = [];

        foreach($posts as $post){
            
            $post_object = new stdClass();

            $post_object->ID = $post->ID;
            $post_object->slug = $post->post_name;
            $post_object->title = $post->post_title;

            
            
            


            $display_options= get_field('display_options',$post->ID);
            
            
            if($display_options == 'intro galleries'){
                $featured_image_id = get_post_meta($post->ID, 'sub_featured_image')[0];
                $post_object->featured_image = wp_get_attachment_image_src($featured_image_id, 'large')[0]; 
            

            }else{
                if(get_post_meta($post->ID, 'gallery')){
                    
                    $gallery_blocks =get_field('gallery', $post->ID);
                    $featured_image_id = null;
            
            
                    foreach($gallery_blocks as $block){
                        if($block['type'] == 'image block'){
                            $featured_image_id = $block['image_block'][0];
                            break;
                        }
                    
                    }

                    $featured_image = wp_get_attachment_image_src($featured_image_id, 'large')[0];
                    $post_object->featured_image = $featured_image;
                }
                elseif($display_options == "video"){
                    $featured_image_id = get_post_meta($post->ID, 'sub_featured_image')[0];
                    $post_object->featured_image = wp_get_attachment_image_src($featured_image_id, 'large')[0];
                }
                else null;
            }

            $post_object->display_type = $display_options;
            
                    



            array_push($subs_array, $post_object);
        }

    }elseif($display_type == 'video'){
        
        $final_object->video = get_field('video_link', $parent->ID);

    }else{
        $gallery =[];
        $gallery_array = get_field('gallery', $parent->ID);
        foreach($gallery_array as $row){
            $image_object = new stdClass();
            $image_object->type = $row['type'];
            if($row['type'] == 'image block'){
                $image_array = [];
                foreach($row['image_block'] as $image){
                    array_push($image_array, handle_images($image));
                }
                $image_object->block = $image_array;
            }elseif($row['type'] == 'video'){
                $image_object->video_link = $row['video_link'];

            }


            array_push($gallery, $image_object);
        }
        $final_object->gallery = $gallery;
    }

    
    
    
    

   

    
   

    
    
    
    
    if($subs_array){
        $final_object->subs = $subs_array;
    }
    

    return $final_object;
}

add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'sub_(?P<type>.*)(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'get_subs'
    ]);
});


////////////////////////////////////////////////////////////////////////////

function home_page(){

    $args = array(
        'numberposts' => -1,
        'post_type' => "home_page",
        
    );
    $posts = new WP_Query($args);
    $data = [];
    $meta = get_post_meta($posts->post->ID, 'home_page_gallery');
    foreach($meta[0] as $image){
        $handled_image = handle_images($image);
        array_push($data, $handled_image );
    }

    return $data;

}


add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'home_page', [

        'methods'  => 'GET',
        'callback' => 'home_page'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////

function landing_page(){

    $args = array(
        'numberposts' => 1,
        'post_type' => "featured",
        
    );
    $posts = new WP_Query($args);
    
    $meta = get_post_meta($posts->post->ID, "featured_image");
    $image =wp_get_attachment_image_src( $meta[0], 'full' );;
    

    return $image[0];

}

add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'landing_page', [

        'methods'  => 'GET',
        'callback' => 'landing_page'
    ]);
});

/////////////////////////////////////////////////////////////////////////////////

function info_items(WP_REST_Request $request){

    $slug= $request['slug'];
    
    $args = array(
        'numberposts' => -1,
        'post_type' => 'info',
        'name' => $slug
        
    );
    $posts = new WP_Query($args);
    $post = $posts->post;
    
    $meta = get_post_meta($post->ID);
    $data= new stdClass();
    $block_array = [];
    

    if(have_rows("content_block", $post->ID)):
                
        while(have_rows("content_block", $post->ID)) : the_row();

        $block_object = new stdClass();
        $content_rows = [];

        if(have_rows('content')){
            while(have_rows('content')) : the_row();

            $content_row = new stdClass();
            $content_row->paragraph=get_sub_field('paragraph');
            $image=handle_images(get_sub_field('image'));
            if($image['src'] === null){
                $content_row->image= null ;
            } else $content_row->image= $image;
            
            array_push($content_rows, $content_row);




            endwhile;
        }


        $block_object->title = get_sub_field('title');
        $block_object->content=$content_rows;


        array_push($block_array, $block_object);
            

        endwhile;
    endif;

    $data->title=$post->post_title;
    $data->content_blocks = $block_array;

    

    return $data;

}



add_action('rest_api_init', function(){

    register_rest_route('custom-api/v1', 'info_items(?P<slug>.*)', [

        'methods'  => 'GET',
        'callback' => 'info_items'
    ]);
});







