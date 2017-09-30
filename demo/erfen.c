int find(int n,int a[])
{
    int l=sizeof(a)/sizeof(a[0]);
    int low=0;
    int high=l-1;
    int middle=0;
    while(low<high)
    {
        middle=(low+high)>>1;
        if(n==a[middle])
        {
        printf("%d,%d",n,middle);
        return 1;
        }
        else if(n>a[middle])
        low=middle+1;
        else
        high=middle-1;
    }
    return 0;
}