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

class roboGalleryFieldsConfigReaderPhp implements roboGalleryFieldsConfigReaderInterface{

	public function read($filePath){
		return require $filePath;
	}
}