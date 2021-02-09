<?php
/* 
*      Robo Gallery     
*      Version: 3.0.3 - 31466
*      By Robosoft
*
*      Contact: https://robosoft.co/robogallery/ 
*      Created: 2015
*      Licensed under the GPLv2 license - http://opensource.org/licenses/gpl-2.0.php

 */

if ( ! defined( 'WPINC' ) ) exit;

//require_once ROBO_GALLERY_FRONTEND_MODULES_PATH . 'source/abstractSource.php';
require_once ROBO_GALLERY_FRONTEND_MODULES_PATH . 'source/youtubeSource.php';
require_once ROBO_GALLERY_FRONTEND_MODULES_PATH . 'source/baseSource.php';

class roboGalleryModuleSourceV1{
	private $id = null;
	private $options_id = null;

	private $core = null;
	private $cacheDB = null;
	private $gallery = null;

	private $items = array();
	private $cats = array();
	private $tags = array();

	private $source 	= null;
	
	public $galleryType = 'base';

	public function __construct( $core ){
	        $this->core = $core;
	        $this->gallery = $core->gallery;
	        $this->cacheDB = $core->cacheDB;

	        $this->id = $this->gallery->id;
	        $this->options_id = $this->gallery->options_id;  	       	
	       	$this->core->addEvent('gallery.images.get', array($this, 'initItems'));
	}

 	public function getItems(){
 		if( !is_array($this->items) ) return array();
 		return $this->items;
 	}

 	public function getCats(){
 		if( !is_array($this->cats) ) return array();
 		return $this->cats;
 	}

 	public function getTags(){
 		if( !is_array($this->tags) ) return array();
 		return $this->tags;
 	}

 	public function initItems(){ 		
 		$this->galleryType = get_post_meta( $this->id, ROBO_GALLERY_PREFIX . 'gallery_type', true );

 		switch ( $this->galleryType ) {
			case 'youtubepro':
			case 'youtube':
				$this->source =new RoboYoutubeSource( $this->id, $this->core );
				break;
			default:
				$this->source = new RoboBaseSource( $this->id, $this->core );
				break;
		} 

		$this->items = $this->source->getItems();
		$this->cats  = $this->source->getCats();
		$this->tags  = $this->source->getTags();
 		return ;
 	}

}