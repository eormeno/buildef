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

        $parsedTemplates = ['classes' => [], 'instances' => []];

        foreach ($templatesFiles as $templateFile) {
            try {
                self::parseXmlFile($templateFile->getPathname(), $parsedTemplates);
            } catch (\Exception $e) {
                $consoleOutput->writeln($e->getMessage());
            }
        }

        $json = json_encode($parsedTemplates['classes'], JSON_PRETTY_PRINT);
        $consoleOutput->writeln($json);
    }

    private static function parseXmlFile($file, &$parsedTemplates)
    {
        $xml = simplexml_load_file($file);
        $name = $xml->getName();

        if (substr($name, 0, 6) === 'class.') {
            $classInfo = [];
            $name = substr($name, 6);

            $isRootClass = ($name === 'widget' || $name === 'change-parent');
            if ($isRootClass) {
                $classInfo['root'] = true;
            }
            $extends = (string) $xml->attributes()['extends'] ?? "";
            $abstract = (string) $xml->attributes()['abstract'] ?? "false";
            if ($extends !== "") {
                $classInfo['extends'] = $extends;
            }

            if ($abstract === 'true' && !$isRootClass) {
                $classInfo['abstract'] = true;
            }

            $parsedTemplates['classes'][$name] = $classInfo;
        } else {
            $parsedTemplates['instances'][] = $name;
        }
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
