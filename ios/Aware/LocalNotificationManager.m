
@import UIKit;

#import "LocalNotificationManager.h"

@implementation LocalNotificationManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(cancelNotifications)
{
  NSLog(@"Cancel notifications");
  
  [[UIApplication sharedApplication] cancelAllLocalNotifications];
}

RCT_EXPORT_METHOD(scheduleNotification:(NSString *)text interval:(NSInteger)interval)
{
  UILocalNotification *notification = [[UILocalNotification alloc] init];
  
  notification.fireDate = [NSDate dateWithTimeIntervalSinceNow: interval];
  
  notification.alertBody = text;
  
//  notification.soundName = UILocalNotificationDefaultSoundName;
  
  [[UIApplication sharedApplication] scheduleLocalNotification: notification];
  
  NSLog(@"Notification should be presented: %@", text);
}

@end
