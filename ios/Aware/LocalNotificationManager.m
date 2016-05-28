
@import UIKit;

#import "LocalNotificationManager.h"

@implementation LocalNotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(presentLocalNotificationNow:(NSString *)text)
{
  [[UIApplication sharedApplication] cancelAllLocalNotifications];
  
  UILocalNotification *notification = [[UILocalNotification alloc] init];
  
  notification.fireDate = [NSDate dateWithTimeIntervalSinceNow: 1];
  
//  _localNotification.timeZone = [NSTimeZone defaultTimeZone];
  
  notification.alertBody = text;
  
//  _localNotification.soundName = UILocalNotificationDefaultSoundName;
  
//  _localNotification.applicationIconBadgeNumber = [[UIApplication sharedApplication] applicationIconBadgeNumber]+1;
  
  [[UIApplication sharedApplication] scheduleLocalNotification: notification];
  
  UILocalNotification* n2 = [[UILocalNotification alloc] init];
  n2.fireDate = [NSDate dateWithTimeIntervalSinceNow: 10];
  n2.alertBody = @"two";
  [[UIApplication sharedApplication] scheduleLocalNotification: n2];
  
  NSLog(@"Notification should be presented: %@", text);
}

@end
