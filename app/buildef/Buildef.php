<?php

namespace App\Buildef;

use Illuminate\Support\Facades\File;

class Buildef
{

	public static function start()
	{
		$consoleOutput = app('console-output');
		$path = dirname(__FILE__) . '/renders/html';

		$htmlFiles = self::getFiles($path, 'html');

		foreach ($htmlFiles as $file) {
			$consoleOutput->writeln($file->getBasename());
		}
	}

	private static function getFiles($path, $extension)
	{
		$files = File::allFiles($path);
		$filteredFiles = collect($files)->filter(function ($file) use ($extension) {
			return $file->getExtension() === $extension;
		});
		return $filteredFiles;
	}
}