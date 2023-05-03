package com.ideabobo.tool;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Environment;
import android.util.Log;

public class FileTool extends AsyncTask<String, Void, Integer>{
	private static final String COMMAND_BACKUP = "backupDatabase";
    public static final String COMMAND_RESTORE = "restroeDatabase";
    private Context mContext;

    public FileTool(Context context) {
        this.mContext = context;
    }

    @Override
    public Integer doInBackground(String... params) {
        // TODO Auto-generated method stub
    	// 获得正在使用的数据库路径，我的是 sdcard 目录下的 /dlion/db_dlion.db
    	 // 默认路径是 /data/data/(包名)/databases/*.db
//        File dbFile = mContext.getDatabasePath(Environment
//                .getExternalStorageDirectory().getAbsolutePath()
//                + "/dlion/db_dlion.db");
        File dbFileDir = mContext.getDatabasePath("/data/data/com.ideabobo.gap/");
        File exportDir = new File(Environment.getExternalStorageDirectory(),
                "ideaback/");
        if (!exportDir.exists()) {
            exportDir.mkdirs();
        }
        String command = params[0];
        if (command.equals(COMMAND_BACKUP)) {
            try {
                copyDirectiory(dbFileDir.getAbsolutePath(), exportDir.getAbsolutePath());
                return Log.d("backup", "ok");
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
                return Log.d("backup", "fail");
            }
        } else if (command.equals(COMMAND_RESTORE)) {
            try {
            	copyDirectiory(exportDir.getAbsolutePath(), dbFileDir.getAbsolutePath());
                return Log.d("restore", "success");
            } catch (Exception e) {
                // TODO: handle exception
                e.printStackTrace();
                return Log.d("restore", "fail");
            }
        } else {
            return null;
        }
    }

    private void fileCopy(File dbFile, File backup) throws IOException {
        // TODO Auto-generated method stub
        FileChannel inChannel = new FileInputStream(dbFile).getChannel();
        FileChannel outChannel = new FileOutputStream(backup).getChannel();
        try {
            inChannel.transferTo(0, inChannel.size(), outChannel);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } finally {
            if (inChannel != null) {
                inChannel.close();
            }
            if (outChannel != null) {
                outChannel.close();
            }
        }
    }
    
    // 复制文件夹
    public static void copyDirectiory(String sourceDir, String targetDir) throws IOException {
        // 新建目标目录
        (new File(targetDir)).mkdirs();
        // 获取源文件夹当前下的文件或目录
        File[] file = (new File(sourceDir)).listFiles();
        for (int i = 0; i < file.length; i++) {
            if (file[i].isFile()) {
                // 源文件
                File sourceFile = file[i];
                // 目标文件
                File targetFile = new File(new File(targetDir).getAbsolutePath() + File.separator + file[i].getName());
                copyFile(sourceFile, targetFile);
            }
            else if (file[i].isDirectory()) {
                // 准备复制的源文件夹
                String dir1 = sourceDir + "/" + file[i].getName();
                // 准备复制的目标文件夹
                String dir2 = targetDir + "/" + file[i].getName();
                copyDirectiory(dir1, dir2);
            }
        }
    }

    // 复制文件
    public static void copyFile(File sourceFile, File targetFile) throws IOException {
        BufferedInputStream inBuff = null;
        BufferedOutputStream outBuff = null;
        try {
            // 新建文件输入流并对它进行缓冲
            inBuff = new BufferedInputStream(new FileInputStream(sourceFile));

            // 新建文件输出流并对它进行缓冲
            outBuff = new BufferedOutputStream(new FileOutputStream(targetFile));

            // 缓冲数组
            byte[] b = new byte[1024 * 5];
            int len;
            while ((len = inBuff.read(b)) != -1) {
                outBuff.write(b, 0, len);
            }
            // 刷新此缓冲的输出流
            outBuff.flush();
        } finally {
            // 关闭流
            if (inBuff != null)
                inBuff.close();
            if (outBuff != null)
                outBuff.close();
        }
    }
    
    public static void delFolder(String folderPath) {
        try {
           delAllFile(folderPath); //删除完里面所有内容
           String filePath = folderPath;
           filePath = filePath.toString();
           java.io.File myFilePath = new java.io.File(filePath);
           myFilePath.delete(); //删除空文件夹
        } catch (Exception e) {
          e.printStackTrace(); 
        }
   }
   
  //删除指定文件夹下所有文件
   //param path 文件夹完整绝对路径
      public static boolean delAllFile(String path) {
          boolean flag = false;
          File file = new File(path);
          if (!file.exists()) {
            return flag;
          }
          if (!file.isDirectory()) {
            return flag;
          }
          String[] tempList = file.list();
          File temp = null;
          for (int i = 0; i < tempList.length; i++) {
             if (path.endsWith(File.separator)) {
                temp = new File(path + tempList[i]);
             } else {
                 temp = new File(path + File.separator + tempList[i]);
             }
             if (temp.isFile()) {
                temp.delete();
             }
             else if (temp.isDirectory()) {
                delAllFile(path + "/" + tempList[i]);//先删除文件夹里面的文件
                delFolder(path + "/" + tempList[i]);//再删除空文件夹
                flag = true;
             }
          }
          return flag;
        }
      
      public static String getSDPath(){ 
          File sdDir = null; 
          boolean sdCardExist = Environment.getExternalStorageState()   
                              .equals(android.os.Environment.MEDIA_MOUNTED);   //判断sd卡是否存在 
          if(sdCardExist){                               
            sdDir = Environment.getExternalStorageDirectory();//获取跟目录 
          }   
          return sdDir.toString();   
      }
      
      public static final String[][] MIME_MapTable={  
              //{后缀名， MIME类型}  
              {".3gp",    "video/3gpp"},  
              {".apk",    "application/vnd.android.package-archive"},  
              {".asf",    "video/x-ms-asf"},  
              {".avi",    "video/x-msvideo"},  
              {".bin",    "application/octet-stream"},  
              {".bmp",    "image/bmp"},  
              {".c",  "text/plain"},  
              {".class",  "application/octet-stream"},  
              {".conf",   "text/plain"},  
              {".cpp",    "text/plain"},  
              {".doc",    "application/msword"},  
              {".docx",   "application/vnd.openxmlformats-officedocument.wordprocessingml.document"},  
              {".xls",    "application/vnd.ms-excel"},   
              {".xlsx",   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"},  
              {".exe",    "application/octet-stream"},  
              {".gif",    "image/gif"},  
              {".gtar",   "application/x-gtar"},  
              {".gz", "application/x-gzip"},  
              {".h",  "text/plain"},  
              {".htm",    "text/html"},  
              {".html",   "text/html"},  
              {".jar",    "application/java-archive"},  
              {".java",   "text/plain"},  
              {".jpeg",   "image/jpeg"},  
              {".jpg",    "image/jpeg"},  
              {".js", "application/x-javascript"},  
              {".log",    "text/plain"},  
              {".m3u",    "audio/x-mpegurl"},  
              {".m4a",    "audio/mp4a-latm"},  
              {".m4b",    "audio/mp4a-latm"},  
              {".m4p",    "audio/mp4a-latm"},  
              {".m4u",    "video/vnd.mpegurl"},  
              {".m4v",    "video/x-m4v"},   
              {".mov",    "video/quicktime"},  
              {".mp2",    "audio/x-mpeg"},  
              {".mp3",    "audio/x-mpeg"},  
              {".mp4",    "video/mp4"},  
              {".mpc",    "application/vnd.mpohun.certificate"},        
              {".mpe",    "video/mpeg"},    
              {".mpeg",   "video/mpeg"},    
              {".mpg",    "video/mpeg"},    
              {".mpg4",   "video/mp4"},     
              {".mpga",   "audio/mpeg"},  
              {".msg",    "application/vnd.ms-outlook"},  
              {".ogg",    "audio/ogg"},  
              {".pdf",    "application/pdf"},  
              {".png",    "image/png"},  
              {".pps",    "application/vnd.ms-powerpoint"},  
              {".ppt",    "application/vnd.ms-powerpoint"},  
              {".pptx",   "application/vnd.openxmlformats-officedocument.presentationml.presentation"},  
              {".prop",   "text/plain"},  
              {".rc", "text/plain"},  
              {".rmvb",   "audio/x-pn-realaudio"},  
              {".rtf",    "application/rtf"},  
              {".sh", "text/plain"},  
              {".tar",    "application/x-tar"},     
              {".tgz",    "application/x-compressed"},   
              {".txt",    "text/plain"},  
              {".wav",    "audio/x-wav"},  
              {".wma",    "audio/x-ms-wma"},  
              {".wmv",    "audio/x-ms-wmv"},  
              {".wps",    "application/vnd.ms-works"},  
              {".xml",    "text/plain"},  
              {".z",  "application/x-compress"},  
              {".zip",    "application/x-zip-compressed"},  
              {"",        "*/*"}    
          }; 
      
      /** 
       * 根据文件后缀名获得对应的MIME类型。 
       * @param file 
       */  
      public static String getMIMEType(File file) {  
            
          String type="*/*";  
          String fName = file.getName();  
          //获取后缀名前的分隔符"."在fName中的位置。  
          int dotIndex = fName.lastIndexOf(".");  
          if(dotIndex < 0){  
              return type;  
          }  
          /* 获取文件的后缀名 */  
          String end=fName.substring(dotIndex,fName.length()).toLowerCase();  
          if(end=="")return type;  
          //在MIME和文件类型的匹配表中找到对应的MIME类型。  
          for(int i=0;i<MIME_MapTable.length;i++){ //MIME_MapTable??在这里你一定有疑问，这个MIME_MapTable是什么？  
              if(end.equals(MIME_MapTable[i][0]))  
                  type = MIME_MapTable[i][1];  
          }         
          return type;  
      }
      
      public static Intent openFile(File file){  
          
    	    Intent intent = new Intent();  
    	    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  
    	    //设置intent的Action属性  
    	    intent.setAction(Intent.ACTION_VIEW);  
    	    //获取文件file的MIME类型  
    	    String type = getMIMEType(file);  
    	    //设置intent的data和Type属性。  
    	    intent.setDataAndType(/*uri*/Uri.fromFile(file), type);  
    	    //跳转  
    	    return intent;  
    	      
    	}
      
      private void writeTxtToFile(String strcontent, String filePath, String fileName) {
          //生成文件夹之后，再生成文件，不然会出错
          makeFilePath(filePath, fileName);

          String strFilePath = filePath + fileName;
          // 每次写入时，都换行写
          String strContent = strcontent + "\r\n";
          try {
              File file = new File(strFilePath);
              if (!file.exists()) {
                  Log.d("TestFile", "Create the file:" + strFilePath);
                  file.getParentFile().mkdirs();
                  file.createNewFile();
              }
              RandomAccessFile raf = new RandomAccessFile(file, "rwd");
              raf.seek(file.length());
              raf.write(strContent.getBytes());
              raf.close();
          } catch (Exception e) {
              Log.e("TestFile", "Error on write File:" + e);
          }
      }
      private File makeFilePath(String filePath, String fileName) {
          File file = null;
          makeRootDirectory(filePath);
          try {
              file = new File(filePath + fileName);
              if (!file.exists()) {
                  file.createNewFile();
              }
          } catch (Exception e) {
              e.printStackTrace();
          }
          return file;
      }

  //生成文件夹

      private static void makeRootDirectory(String filePath) {
          File file = null;
          try {
              file = new File(filePath);
              if (!file.exists()) {
                  file.mkdir();
              }
          } catch (Exception e) {
              Log.i("error:", e + "");
          }
      }
}
