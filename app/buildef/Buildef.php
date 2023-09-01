<?php

namespace App\Buildef;

use Illuminate\Support\Facades\File;

class Buildef
{

    public static function start()
    {
        $consoleOutput = app('console-output');
        $path = self::getBuildefTemplatesDir();

        $templatesFiles = self::getFiles($path, 'xml');

        foreach ($templatesFiles as $templateFile) {
            try {
                $template = self::parseXmlFile($templateFile->getPathname());
                $consoleOutput->writeln($template['name'] . ' is ' . $template['is']);
            } catch (\Exception $e) {
                $consoleOutput->writeln($e->getMessage());
            }
        }
    }

    private static function parseXmlFile($file)
    {
        $xml = simplexml_load_file($file);
        $rootName = $xml->getName();
        $attributeIs = $xml->attributes()['is'] ?? '(root)';

        $template = [
            'name' => $rootName,
            'is' => $attributeIs,
        ];
        return $template;
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

    private static function getBuildefTemplatesDir()
    {
        $viewLogicPath = base_path() . '/view-logic';
        return $viewLogicPath;
    }
}
