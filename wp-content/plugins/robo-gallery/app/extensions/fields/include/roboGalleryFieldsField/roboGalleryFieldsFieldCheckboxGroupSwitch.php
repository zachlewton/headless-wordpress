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

class roboGalleryFieldsFieldCheckboxGroupSwitch extends roboGalleryFieldsFieldCheckboxGroup{
	
	protected function getDefaultOptions(){
		return array(
			'size' 		=> 'large',
			'onLabel' 	=> __('On', 'robo-gallery'),
			'offLabel' 	=> __('Off', 'robo-gallery'),
		);
	}

}
