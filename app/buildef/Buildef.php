<?php

namespace App\Buildef;

use Illuminate\Support\Facades\File;

class Buildef
{

	public static function start()
	{
		$consoleOutput = app('console-output');
		$path = self::getHtmlTemplatesDir();

		$templatesFiles = self::getFiles($path, 'html');

		foreach ($templatesFiles as $templateFile) {
			$template = self::parseXmlFile($templateFile->getPathname());
			$consoleOutput->writeln('Template: ' . $template);
		}
	}

	private static function parseXmlFile($file)
	{
		$xml = simplexml_load_file($file);
		if (!$xml) {
			throw new \Exception('Error parsing XML template file: ' . $file);
		}
		$template_name = $xml['name'];
		$template_params = self::parseTemplateParams($xml);
		return $template_name;
	}

	private static function parseTemplateParams($xml)
	{
		$params = [];
		foreach ($xml->param as $param) {
			$params[] = [
				'name' => $param['name'],
				'type' => $param['type'],
				'default' => $param['default'],
				'readonly' => $param['readonly'] === 'true',
			];
		}
		return $params;
	}

	private static function getFiles($path, $extension)
	{
		$files = File::allFiles($path);
		$filteredFiles = collect($files)->filter(function ($file) use ($extension) {
			return $file->getExtension() === $extension;
		});
		return $filteredFiles;
	}

	private static function getHtmlTemplatesDir()
	{
		return dirname(__FILE__) . '/renders/html';
	}
}