var awsCli = require('aws-cli-js');
var Options = awsCli.Options;
var Aws = awsCli.Aws;

var options = new Options(
    /* accessKey    */ 'ASIA5WZ6IIVRD7MRDZMT',
    /* secretKey    */ 'ce950vF6Q8aggwUpzuz66yebjmwlBY1JdxgG6mIJ',
    /* sessionToken */ 'FQoGZXIvYXdzEBwaDMzWiHcs2SGC4HORHiLuBIhE5WrrpgUif0NrSbRNLVZAD/djvsTRdl0Pvmhl/hlXxvYEoM6mH0fcOoYQOb9S0wboEtvB7oqRYIns2+r28ycKrR2RXghHDM8h9LevjPtx9lz81JZ+YFBeCK4Zz21dVjGHX5x9vkdhvhmWEK8PBsmW+/ropsiiUCs5ElWyAvEI6nvW2chgU9nBpkHYC5xUxjDQKi2HK0hGpajXzRZYQHur8x8RnTBdi74Y0ig26Vivs+SFZBjO2+SNKPGIn9HRuLP6+MAV75dZzDMlcZgPIJlbbAAfeyX9MXcFCikVakSYVIMU41WP2enWqBzj38E+HIYAaMLaggv0fAjoZ6xfAw59ttphc5/LusvEk6h2iUXo6JDNc40gYNtv7eyxPxHEtsungNMLYuyKIGNdptXGM2nqjK+zA4q7IUJIY0pD6XaSCPSeF5mPNkxFfiatWoj4Jf5AqfJ9ocQ1BEd0MPMxjKDju5EKnLUA90Z+CQZajDCxWf+MhIocBIDEFFPJQIdGXG1EaVTt/kf0nds9MYoxcurvHExqzz9eYOCLKHdUvbNETVBVKXfklFmWjgQ748rLqTDtYiPUP4OeFXl1AjBCV6JS6Xz7RwVRVEa+x/EF3EZPXjOF78p4fDKsATJgSMjFUkVnhEbVrKTfl09iGTaFp000vS0/Hq2yHwTOVegAkixXTQElOmaur1NzYCYb7YRmJud/QUFeoWogwS0llz2v/EDpFSiNgTlwm4uAXDuQHECmcq2kgOT8lTHAci6bBGbM2W1q44joHjpiUQTkFXOOhvYhUbqT4vBkpI3ZTfkXj0kSZKCJ1F14xQPavA7vYIIo0qTv6gU=',
    /* currentWorkingDirectory */ null
);

var aws = new Aws(options);

aws.command('iot list-things', function (err, data) {
    if (err) throw err
    console.log('data = ', data.raw);
});

  //data = {
  //  command: 'aws iam list-users ',
  //  raw: '{\\n    \\"Users\\": [\\n        {\\n            \\"UserName\\": \\"developer\\", \\n            \\"PasswordLastUsed\\": \\"2015-10-03T17:58:49Z\\", \\n            \\"CreateDate\\": \\"2015-06-03T07:37:25Z\\", \\n            \\"UserId\\": \\"AIDAJBXXXXXXXXXXXXXXXXX\\", \\n            \\"Path\\": \\"/\\", \\n            \\"Arn\\": \\"arn:aws:iam::03XXXXXXXXX:user/developer\\"\\n        }\\n    ]\\n}\\n',
  //  object:
  //   {
  //     Users:
  //      [{
  //        UserName: 'developer',
  //        PasswordLastUsed: '2015-10-03T17:58:49Z',
  //        CreateDate: '2015-06-03T07:37:25Z',
  //        UserId: 'AIDAJBXXXXXXXXXXXXXXXXX',
  //        Path: '/',
  //        Arn: 'arn:aws:iam::03XXXXXXXXX:user/developer'
  //      }]
  //   }
  //}