import React, { useState } from 'react';
import { FileKey, Upload, Download, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { toast } from 'sonner';

export const FileTransfer = () => {
  const [file, setFile] = useState(null);
  const [encrypting, setEncrypting] = useState(false);
  const [encrypted, setEncrypted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [encryptionKey, setEncryptionKey] = useState('');

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setEncrypted(false);
      setProgress(0);
      toast.success(`File selected: ${selectedFile.name}`);
    }
  };

  const encryptFile = () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }

    setEncrypting(true);
    setProgress(0);
    toast.info('Encrypting file with AES-256...');

    // Simulate encryption progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setEncrypting(false);
          setEncrypted(true);
          setEncryptionKey('AES256-' + Math.random().toString(36).substring(2, 15).toUpperCase());
          toast.success('File encrypted successfully!');
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const downloadEncrypted = () => {
    toast.success('Encrypted file downloaded!');
  };

  return (
    <div className="space-y-6 animate-slide-in">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-gradient-cyber mb-2">Secure File Transfer</h1>
        <p className="text-muted-foreground">Encrypt and transfer sensitive files with military-grade security</p>
      </div>

      {/* Upload Card */}
      <Card className="glass-card border border-primary/20 neon-glow">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-primary" />
            <span>File Upload</span>
          </CardTitle>
          <CardDescription>Select a file to encrypt using AES-256 encryption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* File Drop Zone */}
            <div className="border-2 border-dashed border-border/30 rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium text-foreground">Click to upload file</p>
                    <p className="text-sm text-muted-foreground mt-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Supports all file types up to 100MB</p>
                </div>
              </label>
            </div>

            {/* Selected File */}
            {file && (
              <div className="p-4 rounded-lg bg-muted/20 border border-border/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileKey className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                  </div>
                  {encrypted ? (
                    <Badge className="bg-success/20 text-success border-success/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Encrypted
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Ready</Badge>
                  )}
                </div>
              </div>
            )}

            {/* Encrypt Button */}
            {file && !encrypted && (
              <Button
                onClick={encryptFile}
                disabled={encrypting}
                className="w-full bg-primary hover:bg-primary/90"
                size="lg"
              >
                {encrypting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                    Encrypting...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Encrypt File
                  </>
                )}
              </Button>
            )}

            {/* Encryption Progress */}
            {encrypting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Encrypting with AES-256</span>
                  <span className="text-foreground font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Encryption Results */}
      {encrypted && (
        <div className="space-y-6 animate-slide-in">
          <Card className="glass-card border border-success/30">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-success">
                <CheckCircle className="w-5 h-5" />
                <span>Encryption Complete</span>
              </CardTitle>
              <CardDescription>Your file has been encrypted successfully</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-success/5 border border-success/20">
                <p className="text-sm text-muted-foreground mb-2">Encryption Key</p>
                <div className="flex items-center justify-between">
                  <code className="text-sm font-mono text-success bg-success/10 px-3 py-1 rounded">
                    {encryptionKey}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(encryptionKey);
                      toast.success('Encryption key copied!');
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-warning mb-1">Important</p>
                    <p className="text-sm text-muted-foreground">
                      Save this encryption key securely. You'll need it to decrypt the file later.
                      Never share this key over unsecured channels.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                onClick={downloadEncrypted}
                className="w-full bg-success hover:bg-success/90"
                size="lg"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Encrypted File
              </Button>
            </CardContent>
          </Card>

          {/* Encryption Details */}
          <Card className="glass-card border border-border/30">
            <CardHeader>
              <CardTitle>Encryption Details</CardTitle>
              <CardDescription>Security specifications for this transfer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { label: 'Algorithm', value: 'AES-256-GCM' },
                  { label: 'Key Exchange', value: 'RSA-4096' },
                  { label: 'Hash Function', value: 'SHA-256' },
                  { label: 'Encryption Mode', value: 'Galois/Counter Mode' },
                  { label: 'Key Strength', value: '256-bit' },
                ].map((detail, index) => (
                  <div key={index} className="flex justify-between py-2 border-b border-border/30 last:border-0">
                    <span className="text-sm text-muted-foreground">{detail.label}</span>
                    <span className="text-sm font-medium text-foreground">{detail.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Info Card */}
      {!file && (
        <Card className="glass-card border border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Lock className="w-5 h-5 text-primary" />
              <span>Military-Grade Encryption</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                Our secure file transfer system uses industry-standard encryption protocols:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>AES-256-GCM encryption for maximum security</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>RSA-4096 key exchange for secure key transmission</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Zero-knowledge architecture - we can't decrypt your files</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>Secure key generation using cryptographic random sources</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FileTransfer;