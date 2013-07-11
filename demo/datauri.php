<?php
	
	function _g($name){
		return isset($_GET[$name]) ? $_GET[$name] : false;
	}
	function _p($name){
		return isset($_POST[$name]) ? $_POST[$name] : '';
	}
	function dbg($data){
		echo '<pre>';
		print_r($data);
		exit;
	}
	$error = '';
	$data_uri = '';
	function check_remote_file_exists($url) {
		$curl = curl_init($url);
		// 不取回数据
		curl_setopt($curl, CURLOPT_NOBODY, true);
		// 发送请求
		$result = curl_exec($curl);
		$found = false;
		// 如果请求没有发送失败
		if ($result !== false) {
			// 再检查http响应码是否为200
			$statusCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);  
			if ($statusCode == 200) {
				$found = true;   
			}
		}
		curl_close($curl);
	 
		return $found;
	}

	$img_url = _g('img');
	if(!$img_url){
		$img_url = _p('img');
	}
	if(!$img_url){
		$flag = false;
	}else{
		$flag = true;
		if(check_remote_file_exists($img_url)){
			$data_uri = getDataURI($img_url);
		}else{
			$error = '图片不存在，请检查您的图片地址';
			$flag = false;
		}

		//print_r(file_get_contents($img_url));

		// $data_uri = getDataURI($img_url);
	}
	function getDataURI($image, $mime = '') {
		return 'data: '.(function_exists('mime_content_type') ? mime_content_type($image) : $mime).';base64,'.base64_encode(file_get_contents($image));
	}
?>
<html>
<head>
<style>
	p.error{
		color: #ff0000;
		text-align: center;
		font-size: 16px;
	}
	p.img{
		text-align: center;
	}
	p.img img{
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
	}
	textarea{
		width: 80%;
		height: 600px;
		display: block;
		margin: 50px auto;
		border: 1px solid #008096;
		padding: 10px;
		border-raidus: 5px;
	}
	.form{
		display: block;
		width: 710px;
		margin: 10px auto;
	}
	.txt{
		width: 80%;
		height: 40px;
		width: 600px;
		padding: 2px;
		border: 1px solid rgb(49, 190, 235);
		border-radius: 5px;
	}
	.act{
		border: none;
		background: rgb(21, 160, 160);
		color: #fff;
		padding: 10px 30px;
	}
	.target{text-align: center;}
</style>
</head>
<body>
	<form action="" method="POST" class="form">
		<input type="text" value="" name="img" class="txt" />
		<input type="submit" class="act" value="提交">
	</form>
	<?php if(!$flag):?>
		<p class="error"><?php echo $error?></p>
	<?php else:?>
		<p class="img"><img src="<?php echo $data_uri?>"></p>
		<p class="target">原图地址： <a href="<?php echo $img_url?>" target="_blank"><?php echo $img_url?></a>
		<textarea><?php echo $data_uri?></textarea>
	<?php endif?>
</body>
</html>