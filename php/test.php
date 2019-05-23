<?php
    $xml = new SimpleXMLElement('<xml/>');                    

    $contador = 0;
    $nomedir = "../";
    function numeroitems($nomedir, $contador, $currentxml){
        $files1 = array_diff(scandir($nomedir), array('..', '.'));

        foreach ($files1 as $value) {
            $temp = sprintf("%s\%s", $nomedir,$value);
            if (is_dir($temp)){
                $dir = $currentxml->addChild('dir');
                $dir->addChild('path', $value);
                $contador = numeroitems($temp, $contador, $dir);
            }
            else{
                $currentxml->addChild('file', $value);
                $contador = $contador + 1;
            }
        }
        return $contador;
    }
    $contador = numeroitems($nomedir, $contador, $xml);
    //printf("%d<br>",$contador);
    print($xml->asXML("xmlteste.xml"));
?>